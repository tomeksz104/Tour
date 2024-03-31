import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";

export const store = configureStore({
  reducer: {
    map: mapSlice,
  },
});
