import request from '~/utils/request';

export const getSubRank = async () => {
    const result = request.get(`engcom/subscribetoprank/subscribe`);

    return result;
};

export const getClassRank = async () => {
    const result = await request.get(`engcom/classestoprank/classes`);

    return result;
};
