import request from '~/utils/request';

export const getMyClass = async (user_id) => {
    const result = await request.get(`engcom/own-class/${user_id}`);

    return result.data;
};
