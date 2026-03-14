import { configureStore } from "@reduxjs/toolkit";
import windowReducer from "./feature/windowSlice";

export const store = configureStore({
  reducer: {
    window: windowReducer,
  },
});

