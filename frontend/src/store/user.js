import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", friends: [], chats: [], anotherUser: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsername(state, action) {
      state.username = action.payload;
    },
    getFriends(state, action) {
      state.friends = action.payload;
    },
    getChats(state, action) {
      state.chats = action.payload;
    },
    getAnotherUser(state, action) {
      state.anotherUser = action.payload;
    },
    clearUserData(state) {
      state.anotherUser = "";
      state.chats = [];
      state.username = "";
      state.friends = [];
    },
  },
});

export default userSlice;
