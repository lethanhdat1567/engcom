import request from '~/utils/request';

export const insertCourseUpdate = async (values) => {
    const result = await request.post(`engcom/course`, values);

    return result.data;
};

export const updateCourseUpdate = async (course_id, values) => {
    const result = await request.put(`engcom/course/${course_id}`, values);

    return result.data;
};

export const deleteCourseUpdate = async (course_id) => {
    const result = await request.delete(`engcom/course/${course_id}`);

    return result.data;
};

// Lesson
export const insertLessonUpdate = async (values) => {
    const result = await request.post(`engcom/lesson`, values);

    return result.data;
};

// Content
export const updateContentUpdate = async (lesson_id, values) => {
    const result = await request.put(`engcom/lesson_content/${lesson_id}`, values);

    return result.data;
};

export const createContentUpdate = async (values) => {
    const result = await request.post(`engcom/lesson_content`, values);

    return result.data;
};
