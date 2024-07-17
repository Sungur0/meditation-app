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

            let favoritesArray;
            if (type === 'article') {
                try {
                    favoritesArray = JSON.parse(state.userInfo.userdata_favorites_article || '[]');
                } catch (e) {
                    favoritesArray = [];
                }

                if (!favoritesArray.includes(id.toString())) {
                    favoritesArray.push(id.toString());
                    state.userInfo.userdata_favorites_article = JSON.stringify(favoritesArray);
                }
            } else if (type === 'program') {
                try {
                    favoritesArray = JSON.parse(state.userInfo.userdata_favorites_meditation || '[]');
                } catch (e) {
                    favoritesArray = [];
                }

                if (!favoritesArray.includes(id.toString())) {
                    favoritesArray.push(id.toString());
                    state.userInfo.userdata_favorites_meditation = JSON.stringify(favoritesArray);
                }
            }
        },

        removeFavorite: (state, action) => {
            const { id, type } = action.payload;

            let favoritesArray;
            if (type === 'article') {
                try {
                    favoritesArray = JSON.parse(state.userInfo.userdata_favorites_article || '[]');
                } catch (e) {
                    favoritesArray = [];
                }

                favoritesArray = favoritesArray.filter(articleId => articleId !== id.toString());
                state.userInfo.userdata_favorites_article = JSON.stringify(favoritesArray);
            } else if (type === 'program') {
                try {
                    favoritesArray = JSON.parse(state.userInfo.userdata_favorites_meditation || '[]');
                } catch (e) {
                    favoritesArray = [];
                }

                favoritesArray = favoritesArray.filter(programId => programId !== id.toString());
                state.userInfo.userdata_favorites_meditation = JSON.stringify(favoritesArray);
            }
        },
        setCompletedSongs(state) {
            state.userInfo.userdata_meditations = (parseInt(state.userInfo.userdata_meditations, 10) + 1)

        },
        addListeningTime(state, action) {
            state.userInfo.userdata_meditationstime = parseInt(state.userInfo.userdata_meditationstime, 10) + parseInt(action.payload.listeningTime, 10);
        },
        addScreenTime: (state, action) => {
            state.userInfo.userdata_articlestime = parseInt(state.userInfo.userdata_articlestime, 10) + parseInt(action.payload, 10);

        },
        setCompletedArticle(state) {
            state.userInfo.userdata_articles = (parseInt(state.userInfo.userdata_articles, 10) + 1)
        },
    },
});

export const { login, logout, signUp, addFavorite, removeFavorite, setCompletedSongs, addListeningTime, addScreenTime, setCompletedArticle } = userSlice.actions;
export default userSlice.reducer;
