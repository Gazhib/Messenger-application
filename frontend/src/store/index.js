import { configureStore } from "@reduxjs/toolkit";
import moreSlice from "./more";
import messagingSlice from "./ActionTypes";
const store = configureStore({
  reducer: { more: moreSlice.reducer, addMessage: messagingSlice.reducer },
});
export const messageActions = messagingSlice.actions;
export const moreActions = moreSlice.actions;
export default store;
