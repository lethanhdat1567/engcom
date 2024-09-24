import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './reducer/UserSlice';
import { ownData } from './reducer/OwnDataSlice';
const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        ownData: ownData.reducer,
    },
});

export default store;
