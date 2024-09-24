import request from '~/utils/request';

export const createNote = async (value) => {
    const result = await request.post('engcom/notebook', value);

    return result;
};

export const readNote = async (user_id) => {
    const results = await request.get(`engcom/notebook/${user_id}`);

    return results.data;
};
export const updateNote = async (id, values) => {
    const results = await request.put(`engcom/notebook/${id}`, values);

    return results.data;
};

export const deleteNote = async (id) => {
    const result = await request.delete(`engcom/notebook/${id}`);

    return result;
};
