import { createSlice } from '@reduxjs/toolkit';

export const rooms = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
    },
    reducers: {
        getRooms(state, action) {
            state.rooms = action.payload;
        },
    },
});
