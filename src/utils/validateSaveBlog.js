export const validateSaveBlog = (blogs, user_id, blog_id) => {
    return blogs.some((blog) => blog.user_id == user_id && blog_id == blog.blog_id);
};
