import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './reducer/UserSlice';
import { ownData } from './reducer/OwnDataSlice';
import { storeData } from './reducer/StoreSlice';
import { teacher } from './reducer/TeacherSlice';
import { activeLesson } from './reducer/ActiveLesson';
const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        teacher: teacher.reducer,
        ownData: ownData.reducer,
        storeData: storeData.reducer,
        activeLesson: activeLesson.reducer,
    },
});

export default store;
