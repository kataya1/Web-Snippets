import React from 'react'
import { useRef } from 'react'

function UserNameInput({ setUserName }) {
    const nameRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        setUserName(nameRef.current.value)
    }
    return (
        <div className='h-screen flex justify-center items-center' >
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} className="bg-gray-100 rounded-lg px-4 py-4 m-4" type="text" id="fname" name="fname" placeholder='username?' />
            </form>
        </div>
    )
}

export default UserNameInput