import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeLogState: (state, action) => {
			state.isAuth = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeLogState } = authSlice.actions;

export default authSlice.reducer;
