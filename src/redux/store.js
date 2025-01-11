import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
