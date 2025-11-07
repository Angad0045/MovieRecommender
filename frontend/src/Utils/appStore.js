import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";

const appStore = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default appStore;
