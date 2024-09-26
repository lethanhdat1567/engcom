import request from '~/utils/request';

export const refreshToken = async (refresh_token) => {
    const result = await request.post('engcom/refresh', refresh_token);

    return result;
};
