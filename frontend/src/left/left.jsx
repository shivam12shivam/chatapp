import React, { useState } from 'react';
import Search from './search';
import Avatars from './avatars';

export default function Left() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (visible on small screens only) */}
      <button
        className="sm:block md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <div
        className={`
          bg-[rgb(92,80,130)] text-white p-4 transition-all duration-300
          sm:fixed sm:top-0 sm:left-0 sm:h-full sm:z-40
          ${isOpen ? 'sm:w-48' : 'sm:w-0 sm:overflow-hidden'}
          sm:flex sm:flex-col sm:items-center sm:justify-between
          md:static md:w-auto md:h-auto md:flex-row md:flex
        `}
      >
        <Search />
        <Avatars />
      </div>
    </>
  );
}
