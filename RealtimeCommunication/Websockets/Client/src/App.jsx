
import './App.css'
import '../tailwind.css';
import ComposeBox from './components/ComposeBox/ComposeBox'
import Feed from './components/Feed/Feed';
import { Post, initialPosts } from './utilities';

import '../output.css'
import { useState, useRef, useEffect } from 'react';
import { useId } from 'react';


function App() {

  const [connected, setConnected] = useState(false)
  const webSocketRef = useRef(null);
  const [posts, setPosts] = useState(initialPosts)



  useEffect(() => {
    try {
      webSocketRef.current = new WebSocket('wss://localhost:5050');
      webSocketRef.current.onerror = (err) => console.log
      webSocketRef.current.onopen = () => setConnected(true);
      webSocketRef.current.onclose = () => setConnected(false);
      webSocketRef.current.onmessage = (message) => {
        const { type, data } = JSON.parse(message);
        if (['message', 'user_joined', 'user_left'].includes(type)) {
          setPosts(prev => [...prev, new Post(data)])
        }
      }
    }
    catch (err) {
      console.error(err)
    }
    return () => webSocketRef.current.close();
  }, []);

  return (
    <div className="max-w-70vw mx-auto">
      <ComposeBox send={webSocketRef.current?.send} open={connected} isclosing={webSocketRef.current?.readyState === 2} />
      <Feed ws={webSocketRef.current} open={connected} posts={posts} />
    </div>
  )
}
export default App
