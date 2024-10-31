import { createSlice } from '@reduxjs/toolkit';

export const course = createSlice({
    name: 'course',
    initialState: {
        course: [],
        progress: [], // progress là một mảng
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
            const lesson_id = action.payload?.id;
            const course_id = action.payload?.course_id;

            // Tìm bài học và cập nhật trạng thái
            state.course.forEach((item) => {
                item.lessons.forEach((lesson) => {
                    if (lesson.id == lesson_id) {
                        lesson.is_in_progress = true;
                        lesson.is_completed = false;
                    }
                });
            });

            // Thêm vào mảng progress nếu chưa có
            const existingProgressIndex = state.progress.findIndex(
                (progress) => progress.id == lesson_id && progress.course_id == course_id,
            );
            if (existingProgressIndex == -1) {
                state.progress.push({
                    id: lesson_id, // Sử dụng id thay vì lesson_id
                    course_id, // Thêm course_id vào progress
                    is_in_progress: true,
                    is_completed: false,
                });
            }
        },

        setProgressed(state, action) {
            const lessonId = action.payload.id;
            const course_id = action.payload.course_id; // Lấy course_id từ payload

            // Cập nhật trạng thái bài học
            state.course.forEach((item) => {
                item.lessons.forEach((lesson) => {
                    if (lesson.id == lessonId) {
                        lesson.is_completed = true;
                        lesson.is_in_progress = false;
                    }
                });
            });

            // Cập nhật mảng progress
            const existingProgressIndex = state.progress.findIndex(
                (progress) => progress.id == lessonId && progress.course_id == course_id,
            );
            if (existingProgressIndex !== -1) {
                // Cập nhật nếu đã tồn tại
                state.progress[existingProgressIndex] = {
                    id: lessonId, // Sử dụng id
                    course_id, // Thêm course_id vào progress
                    is_in_progress: false,
                    is_completed: true,
                };
            } else {
                // Nếu không có trong progress, thêm mới
                state.progress.push({
                    id: lessonId, // Sử dụng id
                    course_id, // Thêm course_id vào progress
                    is_in_progress: false,
                    is_completed: true,
                });
            }
        },

        resetProgress(state) {
            state.progress = []; // Đặt lại progress thành mảng rỗng
        },
        // Active navbar
        setActiveLessonID(state, action) {
            state.activeLessonID = action.payload;
        },
        // Selected lesson
        setSelectedLesson(state, action) {
            state.selectedLesson = action.payload;
        },
        updateSelectedLesson(state, action) {
            state.selectedLesson = action.payload;
        },
    },
});
