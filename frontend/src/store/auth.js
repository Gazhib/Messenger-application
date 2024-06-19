import { createSlice } from "@reduxjs/toolkit";

const initialState = { isConnected: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth(state) {
      state.isConnected = !state.isConnected;
    },
  },
});

export default authSlice;
