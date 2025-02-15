import { configureStore } from '@reduxjs/toolkit'
import userDetailReducer from '../features/userDetailSlice' // ✅ Correct Import

export const store = configureStore({
  reducer: {
    app: userDetailReducer, // ✅ Assign the reducer correctly
  },
});
