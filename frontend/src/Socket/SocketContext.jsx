import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setOnlineUsers } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

// Only exports React-related items: Context + Provider component
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket && !user) {
      socket.disconnect();
      setSocket(null);
    }
    if (user?._id && !socket) {
      const s = io('http://localhost:3000', {
        withCredentials: true,
        query: { userId: user._id },
        transports: ['websocket'],
      });

      s.on('connect', () => console.log('Socket connected:', s.id));
      s.on('disconnect', () => console.log('Socket disconnected'));
      s.on("getOnlineUsers", (list) => {
        dispatch(setOnlineUsers(list));
      });
      setSocket(s);
      return () => { s.disconnect(); };
    }
  }, [user?._id]);

  useEffect(() => {
    if (!socket) return;

    const handleOnline = (list) => {
      dispatch(setOnlineUsers(list));
      console.log("Current online users:", list);
    };

    socket.on("getOnlineUsers", handleOnline);

    return () => {
      socket.off("getOnlineUsers", handleOnline);
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
