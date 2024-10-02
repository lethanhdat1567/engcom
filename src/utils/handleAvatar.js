import imgs from '~/assets/Image';

export const handleAvatar = (src) => {
    if (src) {
        return src.includes('googleusercontent.com') || src.includes('facebook.com')
            ? src
            : `${process.env.REACT_APP_BACKEND_UPLOAD}/${src}`;
    } else {
        return imgs.unsetAvatar;
    }
};
