import request from '~/utils/request';

export const createBlog = async (values) => {
    const result = await request.post('engcom/blog', values);

    return result.data;
};

export const updateBlog = async (blog_id, value) => {
    const result = await request.put(`engcom/blog/${blog_id}`, value);

    return result.data;
};

export const deleteBlog = async (blog_id) => {
    const result = await request.delete(`engcom/blog/${blog_id}`);

    return result.data;
};
export const readBlog = async (blog_id) => {
    const result = await request.get(`engcom/blog/${blog_id}`);

    return result.data;
};

export const readListBlog = async (user_id) => {
    const result = await request.get(`engcom/blogs-list/${user_id}`);

    return result.data;
};
export const readAllBlogs = async () => {
    const result = await request.get(`engcom/blog`);

    return result.data;
};

export const getSaveBlog = async (user_id) => {
    const result = await request.get(`engcom/save-blogs/${user_id}`);

    return result.data;
};

export const insertSaveBlog = async (user_id, blog_id) => {
    const result = await request.put(`engcom/save-blogs/${user_id}/${blog_id}`);

    return result.data;
};

export const deleteSaveBlog = async (user_id, blog_id) => {
    const result = await request.delete(`engcom/save-blogs/${user_id}/${blog_id}`);

    return result.data;
};
