import './App.css'
import { useEffect, useState } from 'react'
import Home from './home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setUser } from './redux/userSlice'
import axios from 'axios'
import { SocketProvider } from './Socket/SocketContext'

function App() {
  axios.defaults.withCredentials = true;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // or state.user if slice is named user
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('https://chatapp-doyk.onrender.com/user/me');
        // backend responds { user: { _id, name, email } }
        console.log(data);
        dispatch(setUser(data.user));          // ← now Redux knows you’re logged in

      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (loading) return null;

  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={isAuthenticated ? (
          <Home />
        ) : <Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </SocketProvider>
  )
}

export default App
