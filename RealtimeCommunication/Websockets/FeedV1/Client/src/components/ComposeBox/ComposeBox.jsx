import { useState } from "react";

export default function ComposeBox({ send, isClosing, open }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (open && !isClosing) {
            const message = {
                type: "message",
                data: {
                    content: text
                }
            }

            send(JSON.stringify(message))
        }
    };

    return (
        open &&
        <form onSubmit={handleSubmit} className="flex justify-center">
            <textarea
                className="bg-gray-100 rounded-lg px-4 py-4 m-4 w-1/2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!open}
            />
            <button type="submit" className="rounded bg-blue-500 text-white py-2 px-4 m-4 disabled:bg-gray-200" disabled={!open} >
                Submit
            </button>
        </form>
    );
}


