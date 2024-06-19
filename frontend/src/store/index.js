import { configureStore } from "@reduxjs/toolkit";
import moreSlice from "./more";
import messagingSlice from "./ActionTypes";
import authSlice from "./auth";
const store = configureStore({
  reducer: {
    more: moreSlice.reducer,
    addMessage: messagingSlice.reducer,
    auth: authSlice.reducer,
  },
});
export const messageActions = messagingSlice.actions;
export const moreActions = moreSlice.actions;
export const authActions = authSlice.actions;
export default store;
