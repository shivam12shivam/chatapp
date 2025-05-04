import React from 'react'
import Profilebox from './profilebox'
import Messageall from './messageall'
import Type from './Type'

function Right() {
  return (
    <div className="flex flex-col p-2 h-screen bg-[rgb(92,80,130)]">
      <Profilebox />
      <div className="flex-1 overflow-y-auto">
        <Messageall />
      </div>
      <div className="p-2">
        <Type />
      </div>
    </div>
  )
}

export default Right