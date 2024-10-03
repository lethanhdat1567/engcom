import request from '~/utils/request';

export const getCourseStudent = async (class_id, user_id) => {
    const result = await request.get(`engcom/student/course`, {
        params: {
            c: class_id,
            u: user_id,
        },
    });

    return result.data;
};
