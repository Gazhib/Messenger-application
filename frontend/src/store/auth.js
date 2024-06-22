import { createSlice } from "@reduxjs/toolkit";

const initialState = { isConnected: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth(state, action) {
      state.isConnected = action.payload;
    },
  },
});

export default authSlice;
