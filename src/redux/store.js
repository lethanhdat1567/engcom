import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './reducer/UserSlice';
import { ownData } from './reducer/OwnDataSlice';
import { storeData } from './reducer/StoreSlice';
import { teacher } from './reducer/TeacherSlice';
import { activeLesson } from './reducer/ActiveLesson';
import { subscribeClass } from './reducer/SubscribeSlice';
import { course } from './reducer/Course';
const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        subscribeClass: subscribeClass.reducer,
        teacher: teacher.reducer,
        ownData: ownData.reducer,
        storeData: storeData.reducer,
        activeLesson: activeLesson.reducer,
        course: course.reducer,
    },
});

export default store;
