import React from 'react';

function Profile({ isOnline }) {
    console.log(isOnline);
  return (
    <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
      <div className="w-12 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
  );
}

export default Profile;