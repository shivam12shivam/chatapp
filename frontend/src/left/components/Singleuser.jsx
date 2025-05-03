import React from 'react'
import Profile from './profile'

function Singleuser({name,isOnline}) {



    return (    
        <div className="p-2 flex items-center justify-start border-b-blue-200 border-2 mt-6">
            <Profile isOnline={isOnline}/>
            <h2 className='ml-4 items-start'>{name}</h2>
        </div>

    )
}

export default Singleuser