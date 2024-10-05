import request from '~/utils/request';

export const updateUser = async (value, user_id) => {
    const result = await request.put(`engcom/user/${user_id}`, value);

    return result.data;
};

export const getUser = async (user_id) => {
    const result = await request.get(`engcom/customer/${user_id}`);

    return result.data;
};
