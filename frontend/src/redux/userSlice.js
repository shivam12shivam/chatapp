import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  selectedUserId: null,
  selectedUsername:null,
  messages: [],
  searchword: "",
  onlineUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUserId = action.payload; // Add this reducer
    },
    setSelectedUsername: (state, action) => {
      state.selectedUsername = action.payload; // Add this reducer
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSearchword:(state,action)=>{
      state.searchword=action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; 
    },
  },
});

export const { setUser, logout, setSelectedUser, setMessages, setSelectedUsername, setSearchword ,setOnlineUsers} = authSlice.actions;
export default authSlice.reducer;
