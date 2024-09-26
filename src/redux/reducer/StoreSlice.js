import { createSlice } from '@reduxjs/toolkit';

export const storeData = createSlice({
    name: 'storeData',
    initialState: {
        blogs: null,
    },
    reducers: {
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
