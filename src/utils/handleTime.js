import moment from 'moment';

export const handleTime = (time) => {
    return moment(time).fromNow();
};
