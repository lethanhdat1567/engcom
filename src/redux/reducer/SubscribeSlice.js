import { createSlice } from '@reduxjs/toolkit';

export const subscribeClass = createSlice({
    name: 'subscribeClass',
    initialState: {
        free: [],
    },
    reducers: {
        getFree(state, action) {
            state.free = action.payload;
        },
        setFree(state, action) {
            state.free.push(action.payload);
        },
        deleteFree(state, action) {
            const newClass = state.free.filter((item) => item.id != action.payload);
            state.free = newClass;
        },
    },
});
