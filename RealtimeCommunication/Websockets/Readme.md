### Events
close
error
message
open (client side) | Connection (server side)

no open event server side
```js
wss.on('connection', function connection(ws) {
    ws.on('open', () => {
        ...
    })})
```
no custom events
`ws.on('custom_event', () => console.log('custom_event a7a 🥒🥒🥒🥒'))`
`socket.send('custom_event', "🍅")`

