import moment from 'moment';

export const handleTime = (time) => {
    return moment().subtract(time, 'months').fromNow();
};
