import { createSlice } from '@reduxjs/toolkit';

export const post_like = createSlice({
    name: 'post_like',
    initialState: {
        post_like: [],
    },
    reducers: {
        getLiked(state, action) {
            state.post_like = action.payload;
        },
        deleteLiked(state, action) {
            const newArr = state.post_like.filter((like) => like.id !== action.payload);

            state.post_like = newArr;
        },
        setLiked(state, action) {
            state.post_like.push(action.payload);
        },
    },
});
