import { configureStore } from "@reduxjs/toolkit";

import moreSlice from "./more";

const store = configureStore({
  reducer: { more: moreSlice.reducer },
});

export const moreActions = moreSlice.actions;
export default store;
