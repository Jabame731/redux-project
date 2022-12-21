import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import noteReducer from '../notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
  },
});
