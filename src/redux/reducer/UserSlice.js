import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        getUser(state, action) {
            state.user = action.payload;
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
    },
});
