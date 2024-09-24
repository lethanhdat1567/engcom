import request from '~/utils/request';

export const createNote = async (value) => {
    const result = await request.post('engcom/notebook/store', value);

    return result;
};

export const readNote = async (user_id) => {
    const results = await request.get(`engcom/notebook/show/${user_id}`);

    return results.data;
};
export const updateNote = async (id, values) => {
    const results = await request.put(`engcom/notebook/update/${id}`, values);

    return results.data;
};

export const deleteNote = async (id, user_id) => {
    const result = await request.delete(`engcom/notebook/${id}/${user_id}`);

    return result;
};
