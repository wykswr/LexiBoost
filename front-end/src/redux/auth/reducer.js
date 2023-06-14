import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    isSignIn: true
};

const authSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        toggleAuthMode: (state) => {
            state.isSignIn = !state.isSignIn;
        },
    },
});

export const { toggleAuthMode } = authSlice.actions;

export default authSlice.reducer;
