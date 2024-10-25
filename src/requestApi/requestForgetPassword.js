import request from '~/utils/request';

export const emailCode = async (value) => {
    const result = await request.post(`engcom/password/forgot`, value);

    return result.data;
};

export const resetPasswordCode = async (values) => {
    const result = await request.post(`engcom/password/reset`, values);

    return result;
};

export const validateForget = async (values) => {
    const result = await request.post(`engcom/checktoken`, values);

    return result;
};
