import React, { useState, useRef, useEffect } from 'react'
import Post from '../Post/Post';

import styles from './Feed.module.css'
export default function Feed() {
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const feedRef = useRef(); // just a query selectory
    // Use useRef to hold the observer reference (you can't use it with just a variable and if you declare it inside useEffect you want have access to it in the other useEffect because (scope))
    const observer = useRef(null);



    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            const entry = entries[0]
            if (entry.isIntersecting) {

                observer.current.unobserve(entry.target)// Use observer.current to access the observer object

                postFetcher()
            }
        }, {
            rootMargin: "0px 0px 500px 0px", // bottom margin
            // root: feedRef.current
        });
        const postFetcher = (numPosts = 15) => {
            setLoading(true)
            fetch(`https://api.quotable.io/quotes/random?limit=${numPosts}`)
                .then(res => res.json())
                .then(data => {

                    // Use functional update to access previous state
                    //  so as to not uses quote ([...quotes, ...data]) because it will need to be put in the dep list which we don't want that
                    setLoading(false)
                    setQuotes((prevQuotes) => [...prevQuotes, ...data])

                })
                .catch(err => console.log(err))
        }
        postFetcher(30)
    }, []) // empty dep array, means it only trigger on first mount

    useEffect(() => {
        if (feedRef.current) {
            const lastEl = feedRef.current.lastElementChild
            if (lastEl) {
                observer.current.observe(lastEl)
            }
        }
    }, [quotes]) // on mount and on quotes change


    return (
        <article ref={feedRef} className={styles.feed}>
            {quotes.map((post, index) => (
                <Post key={`${post._id}${index}`} author={post.author}>
                    {post.content}
                </Post>
            ))}
            {loading && <div>loading...</div>}
        </article>
    )
}
