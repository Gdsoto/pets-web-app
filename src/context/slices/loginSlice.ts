import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
	id: number;
	roles: string[];
	firtsName: string;
	secondName: string;
	lastName: string;
}

const initialState: LoginState = {
	roles: [],
	id: 0,
	firtsName: '',
	secondName: '',
	lastName: '',
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		updateLoginState: (state, action: PayloadAction<LoginState>) => {
			state.id = action.payload.id;
			state.roles = action.payload.roles;
			state.firtsName = action.payload.firtsName;
			state.lastName = action.payload.lastName;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateLoginState } = loginSlice.actions;

export default loginSlice.reducer;
