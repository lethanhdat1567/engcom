import { createSlice } from '@reduxjs/toolkit';

export const teacher = createSlice({
    name: 'teacher',
    initialState: {
        carts: {},
        courses: [],
        lessons: [],
    },
    reducers: {
        // carts
        setCart(state, action) {
            state.carts = action.payload;
        },
        updateCarts(state, action) {
            state.carts = action.payload;
        },
        deleteCarts(state) {
            state.carts = {};
        },
        // courses
        setCourse(state, action) {
            state.courses.push(action.payload);
        },
        updateCourse(state, action) {
            const stateIndex = state.courses.findIndex((item) => item.id === action.payload.id);
            if (stateIndex !== -1) {
                state.courses[stateIndex] = { ...state.courses[stateIndex], ...action.payload };
            }
        },
        deleteCourse(state, action) {
            const newCourse = state.courses.filter((item) => item.id !== action.payload);
            state.courses = newCourse;
            const newLesson = state.lessons.filter((item) => item.course_id !== action.payload);
            state.lessons = newLesson;
        },
        // lesson
        setLesson(state, action) {
            state.lessons.push(action.payload);
        },
        updateLesson(state, action) {
            const stateIndex = state.lessons.findIndex((item) => item.id === action.payload.id);
            if (stateIndex !== -1) {
                state.lessons[stateIndex] = { ...state.lessons[stateIndex], ...action.payload };
            }
        },
        deleteLesson(state, action) {
            const newCourse = state.lessons.filter((item) => item.id !== action.payload);
            state.lessons = newCourse;
        },
        // Lesson content
        setContent(state, action) {
            const lessonIndex = state.lessons.findIndex((item) => item.id === action.payload.id);
            if (lessonIndex !== -1) {
                const updatedLesson = {
                    ...state.lessons[lessonIndex],
                    ...action.payload,
                };
                state.lessons[lessonIndex] = updatedLesson;
            }
        },
    },
});
