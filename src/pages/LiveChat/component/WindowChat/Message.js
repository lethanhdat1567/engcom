import classNames from 'classnames/bind';
import styles from './WindowChat.module.scss';
import { Avatar } from 'antd';
import { handleTime } from '~/utils/handleTime';
import { handleAvatar } from '~/utils/handleAvatar';
import moment from 'moment';

const cx = classNames.bind(styles);

function Message({ item }) {
    const createdAtMillis = item.createdAt;
    const createdAtMoment = moment(createdAtMillis);

    const monthsAgo = moment().diff(createdAtMoment, 'months');

    return (
        <div className={cx('message')}>
            <div className={cx('message-info')}>
                <Avatar src={handleAvatar(item.avatar)} />
                <div className={cx('message-info-head')}>
                    <span className={cx('user-name')}>{item.name}</span>
                    <span className={cx('timmer')}>{handleTime(monthsAgo)}</span>
                </div>
            </div>
            <p className={cx('content')}>{item.text}</p>
        </div>
    );
}

export default Message;
