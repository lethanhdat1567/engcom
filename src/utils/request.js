import axios from 'axios';

const request = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_API}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
};

export const post = async (path, value) => {
    console.log(process.env.REACT_APP_BACKEND_API);

    const response = await request.post(path, value);

    return response.data;
};

export default request;
