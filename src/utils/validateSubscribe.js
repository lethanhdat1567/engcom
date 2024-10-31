export const validateFree = (freeClass, user_id, class_id) => {
    if (Array.isArray(freeClass) && freeClass.length > 0) {
        return freeClass.some((item) => item.user_id == user_id && class_id == item.class_id);
    }
    return false;
};
