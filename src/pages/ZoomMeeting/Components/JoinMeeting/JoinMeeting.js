import classNames from 'classnames/bind';
import styles from './JoinMeeting.module.scss';
import imgs from '~/assets/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function JoinMeeting() {
    return (
        <Link to={`${process.env.REACT_APP_ROOT}/community/meeting/join`} className={cx('wrap')}>
            <img src={imgs.join_meeting} className={cx('img')} />
            <h2 className={cx('title')}>Join Meeting</h2>
            <p className={cx('desc')}>Join a meeting and invite people</p>
        </Link>
    );
}

export default JoinMeeting;
