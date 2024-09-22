import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('ACCESS_TOKEN') || '',
        user: {},
    },
    reducers: {
        getUser(state, action) {
            state.user = action.payload;
        },
        getToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('ACCESS_TOKEN', state.token);
        },
        updateRole(state, action) {
            state.user.role_id = action.payload;
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
        logoutUser(state) {
            state.user = {};
            state.token = '';
            localStorage.removeItem('ACCESS_TOKEN');
        },
    },
});
