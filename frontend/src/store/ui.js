import { createSlice } from "@reduxjs/toolkit";

const initialState = { isMore: true, regLog: "registration" };

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
  },
});
export default uiSlice;
