import { createSlice } from '@reduxjs/toolkit';

export const course = createSlice({
    name: 'course',
    initialState: {
        course: [],
        progress: [],
        activeLessonID: null,
    },
    reducers: {
        // Course
        setCourse(state, action) {
            state.course = action.payload;
        },
        // Progress
        setProgressing(state, action) {
            const progressData = {
                ...action.payload,
                is_in_progress: true,
                is_completed: false,
            };

            state.progress.push(progressData);
            state.course = state.course.map((item) => {
                return {
                    ...item,
                    lessons: item.lessons.map((lesson) => {
                        if (lesson.id == action.payload.lessons_id) {
                            return {
                                ...lesson,
                                is_in_progress: true,
                                is_completed: false,
                            };
                        }
                        return lesson;
                    }),
                };
            });
        },
        setProgressed(state, action) {
            state.course = state.course.map((item) => {
                return {
                    ...item,
                    lessons: item.lessons.map((lesson) => {
                        if (lesson.id === action.payload.lesson_id) {
                            return {
                                ...lesson,
                                is_completed: true,
                                is_in_progress: false,
                            };
                        }
                        return lesson;
                    }),
                };
            });

            const progressData = {
                ...action.payload,
                is_in_progress: false,
                is_completed: true,
            };

            state.progress.push(progressData);
        },
        setActiveLessonID(state, action) {
            state.activeLessonID = action.payload;
        },
    },
});
