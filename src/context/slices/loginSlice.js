import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		updateLoginState: (state, action) => {
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
