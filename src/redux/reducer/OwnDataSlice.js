import { createSlice } from '@reduxjs/toolkit';

export const ownData = createSlice({
    name: 'ownData',
    initialState: {
        notes: null,
        blogs: null,
    },
    reducers: {
        getNotes(state, action) {
            state.notes = action.payload;
        },
        setNotes(state, action) {
            state.notes.push(action.payload);
        },
        updateNotes(state, action) {
            const stateIndex = state.notes.findIndex((item) => item.id === action.payload.id);
            if (stateIndex !== -1) {
                state.notes[stateIndex] = { ...state.notes[stateIndex], ...action.payload };
            }
        },
        deleteNotes(state, action) {
            const newNotes = state.notes.filter((item) => item.id !== action.payload.id);
            state.notes = newNotes;
        },
        getBlogs(state, action) {
            state.blogs = action.payload;
        },
        setBlogs(state, action) {
            if (state.blogs) {
                state.blogs.push(action.payload);
            } else {
                state.blogs = [action.payload];
            }
        },
        updateBlogs(state, action) {
            const stateIndex = state.blogs.findIndex((item) => item.id === action.payload.id);
            if (stateIndex !== -1) {
                state.blogs[stateIndex] = { ...state.blogs[stateIndex], ...action.payload };
            }
        },
        deleteBlogs(state, action) {
            const newBlogs = state.blogs.filter((item) => item.id !== action.payload.id);
            state.blogs = newBlogs;
        },
    },
});
