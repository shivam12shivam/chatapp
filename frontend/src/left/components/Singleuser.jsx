import React from 'react'
import Profile from './profile'

function Singleuser({name,isOnline}) {

    return (    
        <div className="p-2 flex items-center [rgb(152,125,198)] justify-start mt-6">
            <Profile isOnline={isOnline}/>
            <h2 className='ml-4 items-start'>{name}</h2>
        </div>

    )
}

export default Singleuser