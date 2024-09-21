import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './reducer/UserSlice';
const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
    },
});

export default store;
