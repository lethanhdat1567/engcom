import request from '~/utils/request';

// Subscribe
export const getSubscribe = async (user_id) => {
    const result = await request.get(`engcom/subscribe/${user_id}`);

    return result.data;
};

export const insertSubscribe = async (values) => {
    const result = await request.post(`engcom/subscribe`, values);

    return result.data;
};

export const deleteSubscribe = async (id) => {
    const result = await request.delete(`engcom/subscribe/${id}`);

    return result.data;
};

// Private
export const checkPrivateClass = async (values, class_id) => {
    try {
        const result = await request.post(`engcom/private/${class_id}`, values);
        return result.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
};
