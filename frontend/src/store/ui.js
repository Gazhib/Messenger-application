import { createSlice } from "@reduxjs/toolkit";

const initialState = { isMore: false, isPressed: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeIsMore(state) {
      state.isMore = !state.isMore;
    },
    changeIsPressed(state, action) {
      state.isPressed = action.payload;
    },
  },
});
export default uiSlice;
