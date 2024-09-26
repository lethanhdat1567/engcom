import { createSlice } from '@reduxjs/toolkit';

export const activeLesson = createSlice({
    name: 'activeLesson',
    initialState: {
        lesson: {},
    },
    reducers: {
        setActiveLesson(state, action) {
            state.lesson = action.payload;
        },
        deleteActiveLesson(state) {
            state.lesson = {};
        },
    },
});
