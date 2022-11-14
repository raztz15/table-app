import { configureStore } from "@reduxjs/toolkit";
import userSlice, { userReducer } from "./userSlice";
// import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
