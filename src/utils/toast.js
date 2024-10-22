import { Bounce, Slide, toast } from 'react-toastify';

export const toastify = (message, type = 'success', timer = 2000, position = 'bottom-right') => {
    toast[type](message, {
        position: position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
    });
};

export const subToastify = (message) => {
    toast['success'](message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
    });
};
