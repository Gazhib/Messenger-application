import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui";
import messagingSlice from "./ActionTypes";
import authSlice from "./auth";
import userSlice from "./user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["anotherUser"],
};

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  addMessage: messagingSlice.reducer,
  auth: authSlice.reducer,
  user: persistReducer(userPersistConfig, userSlice.reducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const messageActions = messagingSlice.actions;
export const uiActions = uiSlice.actions;
export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
const persistor = persistStore(store);
export { store, persistor };
