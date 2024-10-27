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
export const showDeletedClass = async (user_id) => {
    const result = await request.get(`engcom/GetClasses/${user_id}`);

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

// POST
export const updateRoleUser = async (user_id, role_id) => {
    const result = await request.put(`engcom/GetUser/${user_id}`, { role_id });

    return result.data;
};

// PUT
export const updateApprove = async (class_id, deleted) => {
    const result = await request.put(`engcom/approve/${class_id}`, deleted);

    return result.data;
};
// ANALYSIS
export const getTotal = async () => {
    const result = await request.get(`engcom/analysis/total`);

    return result.data;
};

export const getSeparate = async () => {
    const result = await request.get(`engcom/analysis/separate`);

    return result.data;
};
export const getStatistics = async () => {
    const result = await request.get(`engcom/analysis/statistics`);

    return result.data;
};
