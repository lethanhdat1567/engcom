import request from '~/utils/request';

export const getAsk = async (lesson_id) => {
    const result = await request.get(`engcom/ask/${lesson_id}`);

    return result.data;
};

export const insertAsk = async (values) => {
    const result = await request.post(`engcom/ask`, values);

    return result.data;
};

export const deleteAsk = async (id) => {
    const result = await request.delete(`engcom/ask/${id}`);

    return result.data;
};
