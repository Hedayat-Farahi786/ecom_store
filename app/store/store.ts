// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Create the Redux store and register reducers
export const store = configureStore({
  reducer: {
    user: userReducer, // Registering the counter reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
