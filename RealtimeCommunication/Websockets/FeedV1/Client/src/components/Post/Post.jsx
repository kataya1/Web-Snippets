import React from 'react'
// import styles from './Post.module.css'

export default function Post({ post }) {
    if (post.type == "message") {
        return (
            <div className="bg-white shadow rounded-lg p-4 flex flex-col">
                <div className="text-center text-xl flex-grow">
                    {post.content}
                </div>
                <div className="text-right text-gray-500">
                    {post.user}
                </div>
            </div>
        )
    }

    return (
        <p className="text-gray-500 text-sm">
            {post.user} {post.type == 'user_joined' ? 'joined' : 'left'}
        </p>
    )
}

