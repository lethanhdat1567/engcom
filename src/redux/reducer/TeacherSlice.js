import { createSlice } from '@reduxjs/toolkit';

export const teacher = createSlice({
    name: 'teacher',
    initialState: {
        carts: {},
        courses: [],
        lessons: [],
        content: [],
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
        setUpdateCourse(state, action) {
            state.courses = action.payload;
        },
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
        deleteAllCourse(state, action) {
            state.courses = [];
        },
        // lesson
        setUpdateLesson(state, action) {
            state.lessons = action.payload;
        },
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
        deleteAllLesson(state, action) {
            state.lessons = [];
        },
        // Lesson content
        setUpdateContent(state, action) {
            state.content = action.payload;
        },
        setContent(state, action) {
            state.content.push(action.payload);
        },
        updateContent(state, action) {
            const stateIndex = state.content.findIndex((item) => item.id === action.payload.id);
            if (stateIndex !== -1) {
                state.content[stateIndex] = { ...state.content[stateIndex], ...action.payload };
            }
        },
        deleteContent(state, action) {
            const newCourse = state.content.filter((item) => item.id !== action.payload);
            state.content = newCourse;
        },
        deleteAllContent(state, action) {
            state.content = [];
        },
        resetState(state) {
            state.carts = {};
            state.courses = [];
            state.lessons = [];
            state.content = [];
        },
    },
});
