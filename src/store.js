// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/UserSlice';
import musicReducer from './redux/musicSlice'
const store = configureStore({
  reducer: {
    user: userReducer, 
    music: musicReducer,
  },
});

export default store;