import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Avatar, Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserInfo() {
    return (
        <div className={cx('info-wrap')}>
            <Button ghost>
                <FontAwesomeIcon icon={faChevronLeft} />
                Back
            </Button>
            <div className={cx('user-wrap')}>
                <Avatar>A</Avatar>
                <Typography.Text className={cx('user-name')}>Le Thanh Dat</Typography.Text>
            </div>
        </div>
    );
}

export default UserInfo;
