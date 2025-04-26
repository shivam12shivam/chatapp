import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Messages from './messages';
import useSocket from '../Socket/useSocket';
import { useEffect } from 'react';
import { setMessages } from '../redux/userSlice';
function Messageall() {
  const messages = useSelector(state => state.auth.messages);
  const selectedUserId = useSelector(state => state.auth.selectedUserId);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        // Only add if message belongs to current chat
        if (newMessage.senderId === selectedUserId ||
          newMessage.receiverId === selectedUserId) {
          dispatch(setMessages([...messages, newMessage]));
        }
      });
    }

    return () => {
      if (socket) socket.off('newMessage');
    };
  }, [socket, messages, selectedUserId, dispatch]);

  if (!selectedUserId) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <p className="text-gray-500">Select a user to view messages</p>
      </div>
    );
  }

  return (
    <div className='p-4 overflow-y-auto max-h-[calc(100vh-180px)]'>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <Messages
            key={index}
            message={message}
            isSender={message.senderId === selectedUserId}
          />
        ))
      ) : (
        <p className="text-gray-500">No messages yet</p>
      )}
    </div>
  );
}

export default Messageall;