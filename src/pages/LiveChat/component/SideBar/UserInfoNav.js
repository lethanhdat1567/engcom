import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Avatar, Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function UserInfoNav() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('info-wrap-nav')}>
            <Button ghost className={cx('back-btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Back
            </Button>
            <div className={cx('user-wrap')}>
                <Avatar src={handleAvatar(user.avatar)} />
                <Typography.Text className={cx('user-name')}>{user.name}</Typography.Text>
            </div>
        </div>
    );
}

export default UserInfoNav;
