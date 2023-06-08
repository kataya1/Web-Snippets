import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()
  const [page, setPage] = useState(1);
  const quoteFetcher = async () => {
    try {

      setIsLoading(true)
      const res = await fetch('https://api.quotable.io/quotes/random?limit=25')
      const data = await res.json()
      setPosts([...posts, ...data])
      setPage(page + 1)
    }
    finally {
      setIsLoading(false)

    }
  }

  useEffect(() => {
    quoteFetcher()

  }, [])

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        pullDownToRefreshThreshold={0}
        next={quoteFetcher}
        hasMore={true} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {posts.map(item => (

            <li key={item._id + Math.floor(Math.random() * 10000000000)}>{item.content}</li>

          ))}
        </ul>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App
