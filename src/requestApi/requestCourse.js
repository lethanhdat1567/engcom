import request from '~/utils/request';

export const getCourse = async (class_id) => {
    const result = await request.get(`engcom/own-course/${class_id}`);

    return result.data;
};

export const getDetailCourse = async (id) => {
    const result = await request.get(`engcom/class/${id}`);

    return result.data;
};

export const insertProgress = async (user_id, values) => {
    const result = await request.put(`engcom/progress/${user_id}`, values);

    return result;
};
