// Require the WebSocket library and unique name generator 
const Ws = require('ws');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

// Create a new WebSocket Server on port 5050
const wss = new Ws.Server({ port: 5050 });

// Array to store connected clients 
const clients = [];
// the join and the leave is the message
// When a client connects  
wss.on('connection', (ws) => {

    // Generate a random name for the user 
    const name = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    // Add the socket to the clients array
    clients.push(ws);

    // Send a broadcast message that the user connected
    broadcast(`${name} connected!`);
    ws.on('error', (err) => {
        console.error(err);
    });

    ws.on('message', (data) => {
        // console.log(`Received message from ${ws.name}: ${data}`);
    });
    // When a connected client disconnects 
    ws.on('close', () => {

        // Remove the socket from the clients array 
        clients.splice(clients.indexOf(ws), 1);

        // Send a broadcast message that the user disconnected 
        broadcast(`${name} disconnected!`);
    });
});

// Function to send a message to all connected clients
function broadcast(message) {
    clients.forEach(client => {
        client.send(message);
    })
}
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