

export class Post {
    constructor({ user, content, id, type, createdAt }) {
        this.id = id || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        this.type = type
        this.user = user
        this.content = content
        this.createdAt = createdAt || Date.now()
    }
}
export const initialPosts = [
    new Post({
        user: 'John',
        content: 'Hello world!',
        type: 'message'
    }),
    new Post({
        user: 'Mary',
        content: 'Happy Monday!',
        type: 'message'
    }),
    new Post({
        type: 'user_joined',
        user: 'Bob'
    })
]

export const MessageType = Object.freeze({
    MESSAGE: 'message',
    USER_JOINED: 'user_joined'
});

export function constructMessage(type, { id, user, content }) {
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

    return message;
}