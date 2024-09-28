import request from '~/utils/request';

export const requestUploadCart = async (file) => {
    const result = await request.post('engcom/upload-cart', file);

    return result;
};
export const requestDeleteUpload = async (file) => {
    console.log(file);

    const value = { url: file };
    console.log(value);

    const result = await request.post('engcom/delete-cart', value);

    return result;
};

export const requestUploadVideo = async (file) => {
    const result = await request.post('engcom/upload-video', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return result;
};
export const requestDeleteVideo = async (path) => {
    const result = await request.post('engcom/delete-video', path);

    return result;
};
