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
    // http server
    res.writeHead(200);
    // http://{{host}}:{{port}} will return "hell world"
    res.end("hello world\n");
});
server.listen(port = 8182, () => {
    console.log('HTTPS Server running on port ' + port)
});

// cursor based pagination  (2nd of august work)
// server.on('request') 
// i can change this to use the unrepress library 







/// websocket
const wss = new ws.Server({ server })

const messages = []
let oldestJoinedAtIndex = Infinity
// console.log(wss)
// console.log("🍅" + wss.clients)
// console.log("🍅" + wss.listeners)
// console.log("🍅" + wss.listenerCount)
// console.log({ ...wss.options })
// console.log("🍅" + wss.path)
// console.log("🍅" + wss.setMaxListeners)
const broadCast = (payload, clients, clientNotIncluded = false) => {
    for (let client of clients) {
        if (client != clientNotIncluded)
            client.send(payload)
    }
}
const pageSize = 30
wss.on('connection', (ws) => {

    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    let name;
    let joinedAtIndex = messages.length
    oldestJoinedAtIndex = Math.min(joinedAtIndex, oldestJoinedAtIndex)

    console.log('attempted connection')
    ws.on('message', async (message) => {
        // Handle message from c
        try {
            const m = await JSON.parse(message)
            console.log(m)
            if (m.type == MessageType.USER_JOINED) {
                name = m.data.user
                // if (messages.length < oldestId) oldestId = messages.length
                broadCast(
                    JSON.stringify(
                        constructMessage(
                            MessageType.USER_JOINED
                            , {
                                id: 'join' + id,
                                user: name
                            })
                    )
                    , wss.clients
                )
            }
            else if (m.type == MessageType.MESSAGE) {
                console.log(name)
                const message = {
                    id: messages.length, // use message index as id
                    user: name, // name here works because of closure
                    content: m.data.content,
                    createdAt: new Date()
                }
                messages.push(message)
                broadCast(
                    JSON.stringify(constructMessage(MessageType.MESSAGE, message)),
                    wss.clients
                )
            }

        }
        catch (err) {
            console.error(err)
        }

    });

    ws.on('error', (error) => {
        // Handle any error
        console.error(error);
    });

    ws.on('close', () => {
        // Handle socket close
        console.log('calling close', id, name)
        broadCast(
            JSON.stringify(
                constructMessage(
                    MessageType.USER_LEFT
                    , {
                        id: 'leave' + id,
                        user: name
                    })
            )
            , wss.clients
            , ws
        )
        ws.close()

    });
});






const MessageType = Object.freeze({
    LOAD_MORE: 'load_more',
    MESSAGE: 'message',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left'
});

function constructMessage(type, data) {
    const message = {
        type,
        data,

    };
    message.data.createdAt = new Date()

    return message;
}