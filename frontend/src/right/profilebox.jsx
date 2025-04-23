import React from 'react'
import Profile from '../left/components/profile'
function Profilebox() {
    return (
        <div className='w-full bg-sky-600 h-22 flex flex-col justify-end'>
            <div className="p-2 flex items-center justify-start">
                <Profile />
                <div className='pt-2 pb-2'>
                <h2 className='ml-4 '>shivam</h2>
                <h4 className='ml-3 ' >online</h4>
                </div>
            </div>
        </div>
    )
}

export default Profilebox