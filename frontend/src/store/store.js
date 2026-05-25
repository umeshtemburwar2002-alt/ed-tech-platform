import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/index";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain action types that might contain non-serializable values
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
