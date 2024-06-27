import { createSlice } from "@reduxjs/toolkit";

const initialState = { isMore: true, regLog: "registration", isPressed: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeIsMore(state) {
      state.isMore = !state.isMore;
    },
    changeLogginIn(state, action) {
      state.regLog = action.payload;
    },
    changeIsPressed(state, action) {
      state.isPressed = action.payload;
    },
  },
});
export default uiSlice;
