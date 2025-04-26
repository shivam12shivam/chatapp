import React from 'react';

function Messages({ message, isSender }) {
  return (
    <div>
      <div className={`chat ${isSender ? 'chat-end' : 'chat-start'} p-2`}>
        <div className={`chat-bubble ${isSender ? 'chat-bubble-info' : 'chat-bubble-accent'}`}>
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default Messages;