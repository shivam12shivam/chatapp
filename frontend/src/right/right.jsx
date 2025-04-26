import React from 'react'
import Profilebox from './profilebox'
import Messageall from './messageall'
import Type from './Type'

function Right() {
  return (
    <div className="flex flex-col h-screen">
      <Profilebox />
      <div className="flex-1 overflow-y-auto">
        <Messageall />
      </div>
      <div className="p-2 border-t">
        <Type />
      </div>
    </div>
  )
}

export default Right