
export class Post {

    constructor({ author, content, id, username, type, createdAt }) {

        this.id = id
        this.type = type

        // Use createdAt from server if provided 
        this.createdAt = createdAt || Date.now()

        if (type === 'user_joined') {
            this.username = username
        } else {
            this.author = author
            this.content = content
        }
    }

}

export const initialPosts = [
    new Post({
        author: 'John',
        content: 'Hello world!',
        type: 'message'
    }),
    new Post({
        author: 'Mary',
        content: 'Happy Monday!',
        type: 'message'
    }),
    new Post({
        type: 'user_joined',
        username: 'Bob'
    })
]