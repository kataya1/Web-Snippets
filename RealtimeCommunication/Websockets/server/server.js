const ws = require('ws')
// const https = require('https');
const http = require('http');
const fs = require('fs');

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//     passphrase: 'helloworld'
// };

const server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
});
server.listen(port = 8182, () => {
    console.log('HTTPS Server running on port ' + port)
});
const wss = new ws.Server({ server })

const messages = []
let oldestId = 9999999
wss.on('connection', (ws) => {
    console.log('attempted connection')
    ws.on('message', async (message) => {
        // Handle message from c
        const m = await JSON.parse(message)
        console.log(m)

        if (m.type == MessageType.USER_JOINED) {
            // if (messages.length < oldestId) oldestId = messages.length
            ws.send(JSON.stringify(constructMessage(MessageType.USER_JOINED, {
                id: 'u' + messages.length,
                user: m.data.user
            })));
        }

    });

    ws.on('error', (error) => {
        // Handle any error
        console.error(error);
    });

    ws.on('close', () => {
        // Handle socket close  
        ws.close()
    });

    // Send message to client 

});






const MessageType = Object.freeze({
    MESSAGE: 'message',
    USER_JOINED: 'user_joined'
});

function constructMessage(type, { id, user, content }) {
    const message = {
        type,
        data: {
            user,
            id
        }
    };

    // Only add content for ' message' type
    if (type === 'message') {
        message.data.content = content;
    }

    message.createdAt = Date.now();

    return message;
}