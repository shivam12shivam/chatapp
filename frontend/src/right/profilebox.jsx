import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../left/components/profile';

function Profilebox() {
  const SelectedUsername = useSelector(state => state.auth.selectedUsername);
  const user=useSelector(state=>state.auth.user);
  
  if (!SelectedUsername) {
    return (
      <div className=' bg-[rgb(96,87,125)] w-full h-22 flex flex-col justify-end'>
        <div className="p-2 flex items-center justify-center">
          <p className="text-white">Select a user to start chatting</p>
        </div>
      </div>
    );
  }


  return (
    <div className='w-full rounded-2xl mt-2 bg-[rgb(152,125,198)] h-22 flex flex-col justify-end'>
      <div className="p-2 flex items-center justify-start">
        <Profile />
        <div className='pt-2 pb-2'>
          <h2 className='ml-4 text-white'>{SelectedUsername}</h2>
          <h4 className='ml-3 text-white'>online</h4>
        </div>
      </div>
    </div>
  );
}

export default Profilebox;