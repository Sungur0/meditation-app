import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: {
            favorites: {
                articles: [],
                programs: [],
            },
            musicStats: {
                completedSongs: 0,
                totalListeningTime: 0,
            },
            articleStats: {
                timeSpent: 0,
                completedArticles: 0,
            }
        },
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
        },
        logout(state) {
            return state.initialState;
        },
        signUp(state, action) {
            state.isLoggedIn = true;
            state.userInfo = {
                ...action.payload.userInfo,
                // favorites: {
                //     articles: [],
                //     programs: [],
                // },
                // musicStats: {
                //     completedSongs: 0,
                //     totalListeningTime: 0,
                // },
                // articleStats: {
                //     timeSpent: 0,
                //     completedArticles: 0,
                // },
            };
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
        setCompletedSongs(state) {
            state.userInfo.musicStats.completedSongs += 1;
        },
        addListeningTime(state, action) {
            state.userInfo.musicStats.totalListeningTime += action.payload.listeningTime;
        },
        addScreenTime: (state, action) => {
            state.userInfo.articleStats.timeSpent += action.payload;
        },
        setCompletedArticle(state) {
            state.userInfo.articleStats.completedArticles += 1;
        },
    },
});

export const { login, logout, signUp, addFavorite, removeFavorite, setCompletedSongs, addListeningTime, addScreenTime ,setCompletedArticle} = userSlice.actions;
export default userSlice.reducer;
