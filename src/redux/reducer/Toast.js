import { createSlice } from '@reduxjs/toolkit';

export const toast = createSlice({
    name: 'toast',
    initialState: {
        toastCreateClass: false,
    },
    reducers: {
        setToast(state, action) {
            state.toastCreateClass = action.payload;
        },
    },
});
