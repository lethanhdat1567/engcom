import request from '~/utils/request';

export const createClass = async (values) => {
    const result = await request.post('engcom/class', values);

    return result.data;
};

export const getClasses = async (user_id) => {
    const result = await request.get(`engcom/own-teacher/${user_id}`);

    return result.data;
};

export const getDetailClass = async (id) => {
    const result = await request.get(`engcom/class/${id}`);

    return result.data;
};

export const updateClass = async (values, class_id) => {
    const result = await request.put(`engcom/class/${class_id}`, values);

    return result.data;
};

export const deleteClass = async (class_id) => {
    const result = await request.delete(`engcom/class/${class_id}`);

    return result;
};

export const getAllClasses = async () => {
    const result = await request.get('engcom/class');

    return result.data;
};

export const getMoreClass = async (type) => {
    const result = await request.get(`engcom/class-more/${type}`);

    return result.data;
};
