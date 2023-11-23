import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import loginSlice from './slices/loginSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		login: loginSlice,
	},
});
