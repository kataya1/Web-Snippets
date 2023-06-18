this is the implementation of the wall app. where the post will only be added to the wall if it was re-emited from the server side. 
```
you send post -> server recieve -> server emit for all clients -> you append post
```
another approach is

```
you send post -> you append to wall on your side -> server recieve -> server emit to all clients (but sender/including sender)
```



```json
{
  "type": "message", 
  "data": {
    "message": {
      "id": "1", 
      "user": "John", 
      "content": "Hello world!" 
    } 
  } 
} 


{
  "type": "user_joined", 
  "data": {
    "id": "3",
    "username": "Bob" 
  } 
} 

{
  "type": "messages", 
  "data": {
    "messages": [
      {
        "id": "1", 
        "author": "John", 
        "content": "First message" 
      }, 
      {
        "id": "2", 
        "author": "Mary", 
        "content": "Second message"      
      } 
    ] 
  } 
} 

```


Some other event typesthe WebSocket could support:

- "user_joined" - indicate a user joined 
- "user_left" - a user left
- "typing" - someone is typing 
- "read" - message read receipts

todo:
- [x] user_joined 
- [ ] message post 
- [ ] user leave message (how?) ( i didn't know of wss.client: set then)

  
## Brainstorm 
possible scinarios
- user leave message (how?) ( wss clients set, generate an id inside on connection callback. on close callback will have access to id because it's a closure )
- what if the user closes connection before sending name?
- the server generate the users name randomly. associate client instance (ws) with a user name and send the username with every message a user makes to the feed
- a user sends a message, the server takes the message appends it to the datbase. the server sends the message back to 
  - all clients 
    - the user don't append the message client side (server is a single source of truth)
    - the user appends the message but only validates it (message reached status update)
  - all except client, (user append the message client side)

- a user enter a username (problem: username already exists, possible solution: http get request to check if the username is unique http://localhost:8182/ for the ws://localhost:8182/), saved usernames? <id, user> map
  - userObj = {
    name:
    id: 
    ws: ws
    joinedATIndex
  }
    - if we're checking if the user name is unique we might aswell make it the id <userName, ws>


### breakdown of possible feature(branches) and ways the project can take. simple to complex :
- websocket connection
- log "someone connected" server side (on connection)
- log "you connected" client side (on open)
- emit to all users "user joined"  (wss.clients)
  - all users except the client connected (if ws != client of wss clients)
- generate id for the user (inside the conncetion event callback function closure)
  - make a map associating the id with the client(ws)

- generate random name for the user server side
  - prompt the user to enter a name (client side)


- save the username to a state client side to be sent with each message
- save the username to localstorage (to presist)
- dont remove/do remove username when connection close
  

- don't save the username client side 
- save the username in the clients map 
    - or a variable in the closure

- emit "{user_name} joined" to all users

- user send message/ make post
  - post is anonymous 
  - post has a user

- stateful server, saves the username, generate id, (the user sends minimal data)
- stateless server doesn't save anything (aside from clients() in the wss), user sends everything

- having messages in a variable
  - manage the size of he message var keeping track of a joinedATIndex for each user so that you can discard old messages if the the oldestIndex leave
- having messages in a database

- prevent spam ( throttle )

- send coppied images