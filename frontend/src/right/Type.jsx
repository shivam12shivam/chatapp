import React from 'react'
import { IoSend } from "react-icons/io5";

function Type() {
    return (

        <div className='flex gap-x-2 p-2 '>
            <div className='w-full text-white'>
                <input type="text"
                    placeholder='Type here'
                    className='input input-bordered w-full grow outline-none bg-slate-900' />
            </div>
            <button className='text-2xl text-blue-500 hover:cursor-pointer'>
                <IoSend />
            </button>

        </div>
    )
}

export default Type