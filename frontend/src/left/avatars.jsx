import React, { useEffect, useState } from 'react';
import Singleuser from './components/singleuser';
import axios from 'axios';
import { setSelectedUser, setMessages, setSelectedUsername } from '../redux/userSlice';
import { useDispatch, useSelector } from "react-redux";

function Avatars() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserIdcolor, setSelectedUserIdcolor] = useState(null);
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.searchword);
  const online = useSelector((s) => s.auth.onlineUsers);
  online.map((user) => {
    console.log("online users:-  ", user);
  })

  const handleclick = async (user) => {
    console.log("messages retrived");
    dispatch(setSelectedUser(user._id));
    dispatch(setSelectedUsername(user.name));
    setSelectedUserIdcolor(user._id);
    console.log("receivers id: ", user._id);
    const msg = await axios.get(`https://chatapp-doyk.onrender.com/message/get/${user._id}`);
    console.log(msg.data);
    dispatch(setMessages(msg.data));
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://chatapp-doyk.onrender.com/user/all", {
          withCredentials: true,
        });
        const filteredUsers = (name && name.length > 0)
          ? res.data.filter(user =>
            user.name.toLowerCase().startsWith(name.toLowerCase())
          )
          : res.data;
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Unable to load users.");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [name]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className='max-h-[650px]   md:min-h-[200px] w-auto overflow-y-auto scrollbar-hide bg-[rgb(147,118,197)] mt-3 rounded-2xl pb-6 '>
      {users && users.length > 0 ? (
        users.map((user) => {
          const isOnline = online.includes(user._id);
          return (
            <div key={user._id} className={`hover:cursor-pointer rounded-4xl hover:bg-[rgb(166,143,205)] ${(selectedUserIdcolor === user._id) ? ('bg-[rgb(166,143,205)]') : ('bg-[rgb(135,100,196)]')}`} onClick={() => { handleclick(user) }}>
              <Singleuser name={user.name} isOnline={isOnline} />

            </div>
          )
        })
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </div>
  );
}

export default Avatars;
