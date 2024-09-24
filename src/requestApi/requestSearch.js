import request from '~/utils/request';

export const requestSearch = async (value, type = 'less') => {
    const result = await request.get('engcom/search', {
        params: {
            q: value,
            type,
        },
    });

    return result.data;
};
