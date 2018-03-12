import { Component, Inject, Input, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Websocket } from 'ws';
import { Ng2HighchartsModule } from "ng2-highcharts";
import { GridOptions } from "ag-grid/main";
import { environment } from 'environments/environment';

@Component({
    selector: 'app-home',
    providers: [
        { provide: Window, useValue: window }  
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    //-------- HIGHSTOCK SETUP --------//
    private stockChart = {
        chart: {
            type: 'line',
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        // series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        rangeSelector: { selected: 1 },
        xAxis: { type: 'datetime', tickPixelInterval: 150 },
        yAxis: { title: {text: 'Value' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
        series: [{
            name: 'Random data',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
    };

    private candleData = [];

    private getCandleData = () => {
        let now = (new Date()).getTime();
        for (let i: number = -30; i < 0; i++) {
            this.candleData.push([now + i*6000, 0.075, 0.075, 0.075, 0.075]);
        }
        return this.candleData;
    }

    private candles = {
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green'
            }
        },
        rangeSelector: { selected: 2 },
        title: { text: 'BTC/ETH Price' },
        chart: {
            type: 'candlestick'
        },
        xAxis: { type: 'datetime', tickPixelInterval: 1 },
        series: [{
            name: 'BTC/ETH Price',
            data: this.getCandleData()
        }]
    };

    //------ AG-GRID SETUP ------//
    private gridOptions = <GridOptions>{
        onGridReady: () => {
            this.gridOptions.api.sizeColumnsToFit();
        }
    };
    private columnDefs = [
        {headerName: "Price", field: "price"},
        {headerName: "Amount", field: "quantity"},
        {headerName: "Total", field: "total"},
    ];
    private bidData:any = [];
    private askData:any = [];

    private wss = new WebSocket('ws://localhost:3000/');

    constructor(private router: Router, @Inject(Window) private w: Window) {
        this.router = router;
    }

    ngOnInit() {
        // handler for onopen
        this.wss.onopen = () => this.wss.send('something');

        // handler for onmessage
        this.wss.onmessage = (message) => {
            var msgRows = JSON.parse(message.data);
            this.askData = []; this.bidData = [];

            for (let msgIdx in msgRows) {
                let row = msgRows[msgIdx];

                switch (row.type) {
                    case 'depth': {
                        for (let idx in row.asks) {
                            let price = row.asks[idx].price;
                            let qty   = row.asks[idx].quantity;
                            var o   = {}; o['price']  = +price; o['quantity'] = +qty;
                            o['total']  = (+price * +qty).toPrecision(4);
                            this.askData.push(o);
                        }
                        for (let idx in row.bids) {
                            let price = row.bids[idx].price;
                            let qty   = row.bids[idx].quantity;
                            var o   = {}; o['price']  = +price; o['quantity'] = +qty;
                            o['total']  = (+price * +qty).toPrecision(4);
                            this.bidData.push(o);
                        }
                        break;
                    }
                    case 'candle': {
                        this.candleData.push(row.candle);
                        // Arrghhh!! No idea how to define Highcharts cleanly, but this works.
                        let series = window['Highcharts'].charts[0].series[0];
                        series.addPoint(row.candle, true, true);
                        break;
                    }
                } // end switch
            }
        };
    }

}
