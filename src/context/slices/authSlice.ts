import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isAuth: boolean;
}

const initialState: AuthState = {
	isAuth: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeLogState: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeLogState } = authSlice.actions;

export default authSlice.reducer;
