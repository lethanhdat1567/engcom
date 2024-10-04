import { createSlice } from '@reduxjs/toolkit';

export const course = createSlice({
    name: 'course',
    initialState: {
        course: [],
        progress: [],
        activeLessonID: null,
        selectedLesson: null,
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
                        if (lesson.id == action.payload.lesson_id) {
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
            // Kiểm tra nếu lesson đã hoàn thành
            const lessonId = action.payload.lesson_id;
            // Cập nhật trạng thái lesson trong course
            state.course = state.course.map((item) => {
                return {
                    ...item,
                    lessons: item.lessons.map((lesson) => {
                        if (lesson.id === lessonId) {
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

            // Cập nhật progress: xóa phần tử progressing nếu có
            state.progress = state.progress.filter((progressItem) => progressItem.lesson_id !== lessonId);

            // Thêm phần tử mới vào progress với trạng thái đã hoàn thành
            const progressData = {
                ...action.payload,
                is_in_progress: false,
                is_completed: true,
            };

            state.progress.push(progressData);
        },
        // Active navbar
        setActiveLessonID(state, action) {
            state.activeLessonID = action.payload;
        },
        // Selected lesson
        setSelectedLesson(state, action) {
            const lesson = action.payload;
            state.selectedLesson = {
                ...lesson,
                is_completed: false,
                is_in_progress: true,
            };
        },
    },
});
