export const validateFree = (freeClass, user_id) => {
    if (Array.isArray(freeClass) && freeClass.length > 0) {
        return freeClass.some((item) => item.user_id === user_id);
    }
    return false;
};
