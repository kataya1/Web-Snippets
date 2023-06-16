const ws = require('ws')
let WebSocketServer = ws.WebSocketServer

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('open', () => {
        console.log("open 🍅")
        ws.send('something');
    })
    ws.on('error', console.error);
    // no custom_event
    ws.on('custom_event', () => console.log('custom_event a7a 🥒🥒🥒🥒'))
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    // no open event

});

// ws.on('', console.log('close connection'))

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();

// // Serve client files 
// app.use(express.static('public'));

// const server = http.createServer(app);

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//     ws.on('message', (msg) => {
//         console.log(`Received: ${msg}`);
//         ws.send('Hello from the server!');
//     });
// });

// server.listen(3000, () => {
//     console.log('Server listening on port 3000..');
// })

// =============
// const express = require('express');
// const ws = require('ws');

// const app = express();
// const server = app.listen(3000);

// const wss = new ws.Server({ server });

// wss.on('connection', (socket) => {
//     console.log('Client connected');
//     socket.on('message', (msg) => {
//         console.log(`Received message: ${msg}`);
//         socket.send('Hello from server!');
//     });
// }); 