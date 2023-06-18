
import { Post, initialPosts, constructMessage, MessageType } from '../../utilities';
import { useState, useRef, useEffect } from 'react';
import ComposeBox from '../ComposeBox/ComposeBox'
import Feed from '../Feed/Feed'

function ConnectWebSocket({ userName, url }) {
    const [connected, setConnected] = useState(false)
    const webSocketRef = useRef(null);
    const [posts, setPosts] = useState(initialPosts)



    useEffect(() => {
        try {

            webSocketRef.current = new WebSocket(url);
            webSocketRef.current.onerror = (err) => console.log
            webSocketRef.current.onopen = () => {
                setConnected(true)
                console.log('u connected')
                const m = constructMessage(MessageType.USER_JOINED, { user: userName })
                const sm = JSON.stringify(m)
                webSocketRef.current.send(sm);
            };
            webSocketRef.current.onclose = () => setConnected(false);
            webSocketRef.current.onmessage = async (messageEvent) => {
                const { type, data } = await JSON.parse(messageEvent.data);
                console.log('recievedmessage')
                console.log(data)
                console.log()

                if (['message', 'user_joined', 'user_left'].includes(type)) {
                    setPosts(prev => [...prev, new Post({ type, ...data })])
                }
                else {
                    console.table({ type, data })
                }
            }
        }
        catch (err) {
            console.error(err)
        }
        return () => {
            webSocketRef.current.close();
            setConnected(false)
        }
    }, []);

    return (
        <div className="max-w-70vw mx-auto">
            <ComposeBox send={(m) => webSocketRef.current.send(m)} open={connected} isclosing={webSocketRef.current?.readyState === 2} />
            <Feed ws={webSocketRef.current} open={connected} posts={posts} />
        </div>
    )
}
export default ConnectWebSocket
