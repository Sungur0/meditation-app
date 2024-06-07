import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  sound: null,
  item: null,
  duration: 0,
  progress: 0,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setMusicState: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { setMusicState, setSound, setPlaying, setProgress, setDuration } = musicSlice.actions;

export default musicSlice.reducer;
