import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", friends: [], chats: [] };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsername(state, action) {
      state.username = action.payload;
    },
    getFriends(state, action) {
      state.username = action.payload;
    },
    getChats(state, action) {
      state.username = action.payload;
    },
  },
});

export default userSlice;
