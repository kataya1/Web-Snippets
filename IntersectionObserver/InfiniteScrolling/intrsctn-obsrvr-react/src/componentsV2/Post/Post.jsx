import React from 'react'
import styles from './Post.module.css'

export default function Post({ author, children }) {
    return (
        <div className={styles.post}>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.author}>
                {author}
            </div>
        </div>
    )
}
