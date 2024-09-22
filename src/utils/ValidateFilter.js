export const SocialValue = (data) => {
    const values = {
        token: data.user.accessToken,
        email: data.user.email,
        uid: data.user.uid,
        avatar: data.user.photoURL,
        name: data.user.displayName,
    };
    return values;
};
export const RegisterValue = (data) => {
    return data;
};

export const loginValue = (data) => {
    return data;
};
