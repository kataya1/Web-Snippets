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
      "author": "John", 
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
- [ ] user leave message (how?) ( cleanup useffect?)