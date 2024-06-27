import { createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [] };

const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});
export default messagingSlice;
