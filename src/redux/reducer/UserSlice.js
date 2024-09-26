import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('ACCESS_TOKEN') || '',
        refresh_token: localStorage.getItem('REFRESH_TOKEN') || '',
        user: JSON.parse(localStorage.getItem('USER')) || {},
    },
    reducers: {
        getUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('USER', JSON.stringify(state.user));
        },
        getToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('ACCESS_TOKEN', state.token);
        },
        getRefreshToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('REFRESH_TOKEN', state.token);
        },
        updateRole(state, action) {
            state.user.role_id = action.payload;
            localStorage.setItem('USER', JSON.stringify(state.user));
        },
        logoutUser(state) {
            state.user = {};
            state.token = '';
            state.refresh_token = '';
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
            localStorage.removeItem('USER');
        },
    },
});
