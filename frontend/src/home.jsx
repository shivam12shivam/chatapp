import React from 'react'
import Left from './left/left'
import Right from './right/right'
import Logout from './left/logout'

function Home() {
    return (
        <div className='flex w-screen'>
            <div className='bg-gray-900 text-white items-center pb-2 flex flex-col justify-end w-12'>
                <Logout />
            </div>
            <div className='h-screen bg-gray-600 w-96'>
                <Left />
            </div>
            <div className='h-screen bg-amber-500 w-full'>
                <Right />
            </div>
        </div>
    )
}

export default Home