export const validatePostLike = (postArr, post_id, user_id) => {
    return postArr.some((like) => like.post_id === post_id && like.user_id === user_id);
};

export const validatePostLikeValue = (postArr, post_id, user_id) => {
    return postArr.find((like) => like.post_id === post_id && like.user_id === user_id);
};
