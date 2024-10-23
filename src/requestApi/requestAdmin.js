import request from '~/utils/request';
// GET
export const getApprove = async (class_id) => {
    const result = await request.get(`engcom/approve`);

    return result.data;
};
export const getUser = async (class_id) => {
    const result = await request.get(`engcom/GetUser`);

    return result.data;
};
export const getClass = async (class_id) => {
    const result = await request.get(`engcom/GetClasses`);

    return result.data;
};
export const getBlog = async (class_id) => {
    const result = await request.get(`engcom/getBlogs`);

    return result.data;
};
// DELETE
export const deleteClass = async (class_id) => {
    const result = await request.delete(`engcom/class/${class_id}`);

    return result.data;
};
export const deleteBlog = async (blog_id) => {
    const result = await request.delete(`engcom/blog/${blog_id}`);

    return result.data;
};
export const deleteUser = async (user_id) => {
    const result = await request.delete(`engcom/customer/${user_id}`);

    return result.data;
};
