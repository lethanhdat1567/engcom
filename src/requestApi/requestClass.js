import request from '~/utils/request';

export const createClass = async (values) => {
    const result = await request.post('engcom/class', values);

    return result.data;
};

export const getClasses = async (user_id) => {
    const result = await request.get(`engcom/own-class/${user_id}`);

    return result.data;
};

export const getDetailClass = async (id) => {
    const result = await request.get(`engcom/class/${id}`);

    return result.data;
};
