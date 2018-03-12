'use strict';

import Binance from 'binance-api-node';
import { PublicClient, WebsocketClient } from 'gdax';
const WebSocket = require('ws');

//------ GDAX ROUTINES ------//
let quotes: Array<any>  = Array(1000);
let quotePtr: number    = 0;

const publicClient = new PublicClient();

function getStreamingQuotes() {
    const websocket = new WebsocketClient(['BTC-USD', 'ETH-USD']);
    websocket.on('message', data => {
        if (quotePtr % 500 == 0) console.log("RECEIVED: ", data);
        quotes[quotePtr] = data;
        quotePtr++;
        if (quotePtr >= 1000) quotePtr = 0;
    });
    websocket.on('error', err => {
        console.log("WS ERROR: ", err);
    });
    websocket.on('close', () => {
        console.log("WS CLOSED");
    });
}

async function getProducts() {
    try {
        const products = await publicClient.getProducts();
        console.log("PRODUCTS: ", products.length);
        var ticker = await publicClient.getProductTicker('ETH-USD');
        console.log("TICKER: ", ticker);
    } catch (error) {
        console.log("ERROR: ", error);
    }
}

//---------- Binance stuff ------------//

let bdepth: Array<any>  = Array(1000);
let bdepthPtr: number   = 0;
let bcandle: Array<any> = Array(1000);
let bcandlePtr: number  = 0;

const client = Binance();
let config = {
    apiKey:    'XXXXXXXXXXXXXXXXXXXXXXXXX',
    secretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX'
};

client.ws.candles('ETHBTC', '1m', candle => {
    bcandlePtr++;
    if (bcandlePtr >= 1000) bcandlePtr = 0;
    bcandle[bcandlePtr] = {type: 'candle', candle: [candle.eventTime, +candle.open, +candle.high, +candle.low, +candle.close]};
})

client.ws.partialDepth({symbol: 'ETHBTC', level: 10}, depth => {
    bdepthPtr++;
    if (bdepthPtr >= 1000) bdepthPtr = 0;
    bdepth[bdepthPtr] = {type: 'depth', symbol: depth.symbol, bids: depth.bids, asks: depth.asks};
})

function broadcast(data) {
	server.clients.forEach(client => {
		client.send(data);
	});	
};

function broadcastGDAXQuotes() {
    var timerId;
    if (timerId) clearInterval(timerId);
    const bcast = () => {
        if (quotes[quotePtr] !== null) {
            broadcast(JSON.stringify(quotes[quotePtr]));
        }
    }
    timerId = setInterval(bcast, 2000);
}

function broadcastBinanceMarketData() {
    var timerId;
    if (timerId) clearInterval(timerId);
    const bcast = () => {
        let msgs = [];
        if (bdepth[bdepthPtr] && 'type' in bdepth[bdepthPtr]) {
            msgs.push(bdepth[bdepthPtr]);
        }
        if (bcandle[bcandlePtr] && 'type' in bcandle[bcandlePtr]) {
            msgs.push(bcandle[bcandlePtr]);
        }
        if (msgs.length > 0) {
            broadcast(JSON.stringify(msgs));
        }
    }
    timerId = setInterval(bcast, 2000);
}

// getProducts();
// getStreamingQuotes();
// broadcastGDAXQuotes();
broadcastBinanceMarketData();


//---- Set up the client-facing websocket server ----//
var port  = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

server.on('connection', ws => {
	ws.on('message', message => {
		try {
			broadcast(JSON.stringify(message));
		} catch (e) {
			console.error(e.message);
		}
	});
});

console.log('Server is running on port', port);
