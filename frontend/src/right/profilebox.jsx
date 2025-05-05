import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../left/components/profile';

function Profilebox() {
  const SelectedUsername = useSelector(state => state.auth.selectedUsername);
  const user=useSelector(state=>state.auth.selectedUserId);
  const online=useSelector((state) => state.auth.onlineUsers);
  if (!SelectedUsername) {
    return (
      <div className=' bg-[rgb(147,118,197)] w-full h-22 flex items-center flex-col justify-center rounded-2xl mt-2'>
          <p className="text-white">SELECT A USER TO START CHATTING</p>
      </div>
    );
  }

  const isOnline=online.includes(user);
  console.log("isOnline user : ",isOnline , user);
  return (
    <div className='w-full rounded-2xl mt-2 bg-[rgb(152,125,198)] h-22 flex flex-col justify-end'>
      <div className="p-2 flex items-center justify-start">
        <Profile />
        <div className='pt-2 pb-2 justify-start flex flex-col'>
          <h1 className='ml-3 text-white text-lg'>{SelectedUsername}</h1>
          <h4 className={`ml-3 ${isOnline?("text-green-300"):("text-black")}  text-xs`}>{`${isOnline?("Online"):("Offline")} `}</h4>
        </div>
      </div>
    </div>
  );
}

export default Profilebox;