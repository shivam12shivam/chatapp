import React from 'react'
import Left from './left/left'
import Right from './right/right'
import Logout from './left/logout'

function Home() {
    return (
        <div className='flex w-screen h-screen bg-[rgb(92,80,130)]'>
            <div className=' bg-[rgb(125,108,181)] text-white items-center pb-2 flex flex-col justify-end w-12'>
                <Logout />
            </div>
            <div className='h-screen bg-[rgb(92,80,130)] w-96 '>
                <Left />
            </div>
            <div className='h-screen bg-[rgb(92,80,130)] w-full'>
                <Right />
            </div>
        </div>
    )
}

export default Home