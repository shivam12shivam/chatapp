import React from 'react'
import Search from './search'
import Avatars from './avatars'
export default function Left() {
  return (
    <div className='p-4'>
      <Search />
      <Avatars/>
    </div>
  )
}
