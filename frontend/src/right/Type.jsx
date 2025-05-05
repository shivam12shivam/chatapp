import React from 'react'
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useSocket from '../Socket/useSocket';
function Type() {

    const socket = useSocket();
    const [message, setMessage] = useState('');
    const selectedUserId = useSelector(state => state.auth.selectedUserId);
    console.log(selectedUserId);
    const handleSend = async () => {
        console.log("Message sent: ", message);
        if (!selectedUserId || !message.trim()) return;

        try {
            const res = await axios.post(
                `https://chatapp-doyk.onrender.com/message/send/${selectedUserId}`,
                { message },
                { withCredentials: true }
            );
            const sentMessage = res.data.message;
            // The backend will emit the socket event
            socket.emit('newMessage', sentMessage);
            setMessage('');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default form submission behavior
            handleSend();
        }
    }

    return (
        <div className='flex gap-x-2 p-2'>
            <div className='w-full text-black'>
                <input
                    type="text"
                    placeholder='Type here'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='input input-bordered w-full rounded-2xl grow outline-none bg-gray-200'
                />
            </div>
            <button
                onClick={handleSend}
                className={`text-3xl ${selectedUserId ? 'text-[rgb(77,252,220)]' : 'text-gray-500'} hover:cursor-pointer`}
                disabled={!selectedUserId}
            >
                <IoSend />
            </button>
        </div>
    );
}

export default Type