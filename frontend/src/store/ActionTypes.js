import { createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [] };

const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    initialMessages(state, action) {
      state.messages = action.payload;
    },
  },
});
export default messagingSlice;
