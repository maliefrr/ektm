import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import mahasiswaReducer from "../features/mahasiswa/mahasiswaSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mahasiswa: mahasiswaReducer,
    user: userReducer
  },
});
