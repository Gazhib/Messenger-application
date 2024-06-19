import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moreSlice from "./more";
import messagingSlice from "./ActionTypes";
import authSlice from "./auth";
import userSlice from "./user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  more: moreSlice.reducer,
  addMessage: messagingSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const messageActions = messagingSlice.actions;
export const moreActions = moreSlice.actions;
export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
const persistor = persistStore(store);
export { store, persistor };
