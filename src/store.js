// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/UserSlice';
import audioReducer from './redux/audioSlice'
const store = configureStore({
  reducer: {
    user: userReducer, 
    audio: audioReducer,
  },
});

export default store;