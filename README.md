# Angular5 + Binance + GDAX

Proof of concept integrating Binance + GDAX for data, and Angular5 + Highcharts (Highstocks) + ag-grid for real-time display of the streaming data from exchanges. 

Runs on the latest node.js (v7.8 or greater). No persistence yet. Manual installation (for now).

### Manual Installation

1. Ensure your target machine has node v7.8 (or greater) and Typescript 2.4+.

2. Clone the repository. (git clone https://github.com/snoronha/angular-exchange)

3. In the cloned repository directory, run `npm install` to pull in all dependencies.

4. Plug in your Binance credentials in server.ts (approx. lines 49-50)

5. Compile server.ts (`tsc server.ts`). This should create server.js

5. Start the server: node server.js

6. Start the angular app: `npm start`

### Application Usage

1. Open your web browser to http://localhost:4201.

2. Data should stream in and display.

