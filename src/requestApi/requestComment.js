import request from '~/utils/request';

export const getComment = async (class_id) => {
    const result = await request.get(`engcom/comment/${class_id}`);

    return result.data;
};

export const insertComment = async (values) => {
    const result = await request.post(`engcom/comment`, values);

    return result.data;
};

export const deleteComment = async (id) => {
    const result = await request.delete(`engcom/comment/${id}`);

    return result.data;
};
