import { useContext } from 'react';
import SocketContext from './SocketContext';

// Only exports a hook (not a React component)
export default function useSocket() {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error('useSocket must be used within a <SocketProvider>');
  }
  return socket;
}
