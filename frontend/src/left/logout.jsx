import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux"
import { logout } from '../redux/userSlice';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import useSocket from '../Socket/useSocket';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const handleclick = async () => {
    try {
      console.log("inside handle click")
      await axios.get("https://chatapp-doyk.onrender.com/user/logout", { withCredentials: true });
      dispatch(logout());
      if (socket) {
        socket.disconnect();
      }
      console.log("inside handle click 2")
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <button type="submit" onClick={handleclick}>
      <div className='hover:cursor-pointer'>
        <RiLogoutBoxLine className='text-3xl pb-1' />
      </div>
    </button>
  )
}

export default Logout