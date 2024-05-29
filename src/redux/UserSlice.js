import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: {},
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userInfo = {};
        },
        signUp(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            console.log('Signed up user:', action.payload.userInfo);
        },
    },
});

export const { login, logout, signUp, } = userSlice.actions;
export default userSlice.reducer;
