import { createSlice } from "@reduxjs/toolkit";

const initialState = { meMessage: [], otherMessage: [], users: [] };

const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.meMessage.push(action.payload);
    },
    receiveMessage(state, action) {
      state.otherMessage.push(action.payload);
    },
  },
});
export default messagingSlice;
