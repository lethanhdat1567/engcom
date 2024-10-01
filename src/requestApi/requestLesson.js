import request from '~/utils/request';

export const deleteLesson = async (lesson_id) => {
    const result = request.delete(`engcom/lesson/${lesson_id}`);

    return result;
};
