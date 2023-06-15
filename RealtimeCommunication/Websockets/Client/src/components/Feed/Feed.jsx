import React, { useState, useRef, useEffect } from 'react'
import Post from '../Post/Post';

// import styles from './Feed.module.css'


export default function Feed({ posts }) {
    return (
        <article className="flex flex-col w-full max-w-4xl mx-auto my-10 gap-4">
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                />
            ))}
        </article>
    )
}