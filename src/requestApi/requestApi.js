import request from '~/utils/request';
import { SocialValue } from '~/utils/ValidateFilter';

export const postSocial = async (value) => {
    const valueFilter = SocialValue(value);
    const response = await request.post('engcom/social', valueFilter);

    return response;
};

export const logoutRequest = async () => {
    const result = await request.post('engcom/logout');

    return result;
};
