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
                `http://localhost:3000/message/send/${selectedUserId}`,
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

    return (
        <div className='flex gap-x-2 p-2'>
            <div className='w-full text-white'>
                <input
                    type="text"
                    placeholder='Type here'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='input input-bordered w-full grow outline-none bg-slate-900'
                />
            </div>
            <button
                onClick={handleSend}
                className={`text-2xl ${selectedUserId ? 'text-blue-500' : 'text-gray-500'} hover:cursor-pointer`}
                disabled={!selectedUserId}
            >
                <IoSend />
            </button>
        </div>
    );
}

export default Type