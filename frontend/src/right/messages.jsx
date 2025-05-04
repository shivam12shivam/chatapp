import React from 'react';

function Messages({ message, isSender }) {
  return (
    <div className={`flex ${isSender ? 'justify-start' : 'justify-end'} p-2`}>
      <div
        className={`
          p-3 max-w-xs rounded-2xl  text-white text-shadow-2xs text-shadow-black break-words whitespace-pre-wrap text-left
          ${isSender ? 'bg-[rgb(205,141,104)]' : 'bg-[rgb(130,140,244)]'}
        `}
      >
        {message.message}
      </div>
    </div>
  );
}

export default Messages;
