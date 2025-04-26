import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

// Only exports React-related items: Context + Provider component
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user?._id && !socket) {
      const s = io('http://localhost:3000', {
        withCredentials: true,
        query: { userId: user._id },
        transports: ['websocket'],
      });

      s.on('connect',    () => console.log('Socket connected:', s.id));
      s.on('disconnect', () => console.log('Socket disconnected'));

      setSocket(s);
      return () => { s.disconnect(); };
    }
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
