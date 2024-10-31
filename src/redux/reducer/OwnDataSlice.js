import { createSlice } from '@reduxjs/toolkit';

export const ownData = createSlice({
    name: 'ownData',
    initialState: {
        notes: null,
        saveBlogs: [],
    },
    reducers: {
        // Note
        getNotes(state, action) {
            state.notes = action.payload;
        },
        setNotes(state, action) {
            state.notes.push(action.payload);
        },
        updateNotes(state, action) {
            const stateIndex = state.notes.findIndex((item) => item.id == action.payload.id);
            if (stateIndex !== -1) {
                state.notes[stateIndex] = { ...state.notes[stateIndex], ...action.payload };
            }
        },
        deleteNotes(state, action) {
            const newNotes = state.notes.filter((item) => item.id !== action.payload.id);
            state.notes = newNotes;
        },
        // Savve Blogs
        getSaveBlog(state, action) {
            state.saveBlogs = action.payload;
        },
        setSaveBlog(state, action) {
            state.saveBlogs.push(action.payload);
        },
        deleteSaveBlogs(state, action) {
            state.saveBlogs = state.saveBlogs.filter((blog) => blog.id !== action.payload);
        },
    },
});
