import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: {
            favorites: {
                articles: [],
                programs: [],
            }
        },
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
        addFavorite: (state, action) => {
            const { id, type } = action.payload;
            if (type === 'article' && !state.userInfo.favorites.articles.includes(id)) {
                state.userInfo.favorites.articles.push(id);
            } else if (type === 'program' && !state.userInfo.favorites.programs.includes(id)) {
                state.userInfo.favorites.programs.push(id);
            }
        },
        removeFavorite: (state, action) => {
            const { id, type } = action.payload;
            if (type === 'article') {
                state.userInfo.favorites.articles = state.userInfo.favorites.articles.filter(
                    (articleId) => articleId !== id
                );
            } else if (type === 'program') {
                state.userInfo.favorites.programs = state.userInfo.favorites.programs.filter(
                    (programId) => programId !== id
                );
            }
        },
    },
});

export const { login, logout, signUp, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
