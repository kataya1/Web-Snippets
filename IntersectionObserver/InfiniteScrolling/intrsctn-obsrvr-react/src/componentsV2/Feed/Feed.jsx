import React, { useState, useRef, useEffect } from 'react'
import Post from '../Post/Post';

import styles from './Feed.module.css'
export default function Feed() {
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const feedRef = useRef(); // just a query selectory
    const [page, setPage] = useState(140)
    const [end, setEnd] = useState(false)
    // Use useRef to hold the observer reference (you can't use it with just a variable and if you declare it inside useEffect you want have access to it in the other useEffect because (scope))
    const observer = useRef(new IntersectionObserver(entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {

            observer.current.unobserve(entry.target)// Use observer.current to access the observer object

            setPage(page => page + 1)
        }
    }, {
        rootMargin: "0px 0px 500px 0px", // bottom margin
        // root: feedRef.current // will cause infinte looping because it has flexible height, will always intersect
    }));

    // Use useRef to hold the fetchPosts function
    const fetchPosts = useRef((numPosts = 15, pageNum) => {
        setLoading(true)
        fetch(`https://api.quotable.io/quotes?limit=${numPosts}&page=${pageNum}`)
            .then(res => res.json())
            .then(data => {

                // Use functional update to access previous state
                //  so as to not uses quote ([...quotes, ...data]) because it will need to be put in the dep list which we don't want that
                setLoading(false)
                if (data.statusCode === 429) {
                    throw new Error(data)
                }
                if (data.results.length === 0) {
                    setEnd(true)
                    return
                }
                console.log(data)

                setQuotes((prevQuotes) => [...prevQuotes, ...data.results])

            })
            .catch(err => {
                console.log(err)
            })
    })

    // implement pagination 
    // Move definition and invocation of postFetcher to their own useEffect and only setPage in the observer entry code

    // Keep postFetcher in the original useEffect and only pass variables to it (page, numPosts) create a new usEffect that depends on page that calls postFetcher and to do that i'll need (useRef to hold postFetcher) I'll also make the intersectionObserver setPages rather than call postFetcher. What do you think, 

    useEffect(() => {
        if (feedRef.current) {
            const lastEl = feedRef.current.lastElementChild
            if (lastEl) {
                observer.current.observe(lastEl)
            }
        }
    }, [quotes]) // on mount and on quotes change

    useEffect(() => {
        fetchPosts.current(15, page)
    }, [page]); // fetch on page change

    return (
        <article ref={feedRef} className={styles.feed}>
            {quotes.map((post, index) => (
                <Post key={`${post._id}${index}`} author={post.author}>
                    {post.content}
                </Post>
            ))}
            {loading && <div>loading...</div>}
            {end && <div>That's the end of it...</div>}
        </article>
    )
}
