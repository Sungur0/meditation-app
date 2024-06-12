import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        isPlaying: false,
        progress: 0,
        duration: 0,
        selectedTime: 0,
        currentItem: null,
    },
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setSelectedTime: (state, action) => {
            state.selectedTime = action.payload;
        },
        setCurrentItem(state, action) {
            state.currentItem = action.payload;
        },
        resetAudio: (state) => {
            state.isPlaying = false;
            state.progress = 0;
            state.duration = 0;
            state.selectedTime = 0;
        },
    },
});

export const { setIsPlaying, setProgress, setDuration, setSelectedTime, resetAudio, setCurrentItem  } = audioSlice.actions;
export default audioSlice.reducer;