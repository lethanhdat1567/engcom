import request from '~/utils/request';

export const createPost = async (value) => {
    const result = await request.post(`engcom/fakeThreads`, value);

    return result.data;
};

export const getProfilePost = async (user_id) => {
    const result = await request.get(`engcom/fakeThreads/${user_id}`);

    return result.data;
};

export const getDetailPost = async (post_id) => {
    const result = await request.get(`engcom/post/${post_id}`);

    return result.data;
};

export const getAllPost = async (user_id) => {
    const result = await request.get(`engcom/getAll/${user_id}`);

    return result.data;
};

export const deletePost = async (post_id) => {
    const result = await request.delete(`engcom/fakeThreads/${post_id}`);

    return result.data;
};

// Comment

export const getCommentPost = async (post_id) => {
    const result = await request.get(`engcom/commentpost/${post_id}`);

    return result.data;
};

export const deleteCommentPost = async (comment_id) => {
    const result = await request.delete(`engcom/commentpost/${comment_id}`);

    return result.data;
};

export const insertCommentPost = async (values) => {
    const result = await request.post(`engcom/commentpost`, values);

    return result.data;
};

// Liked

export const getAllLikePost = async () => {
    const result = await request.get(`engcom/likepost`);

    return result.data;
};

export const deleteLikePost = async (like_id) => {
    const result = await request.delete(`engcom/likepost/${like_id}`);

    return result.data;
};

export const inserLikePost = async () => {
    const result = await request.post(`engcom/likepost`);

    return result.data;
};
