import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Avatar, Button, Flex, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { handleAvatar } from '~/utils/handleAvatar';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UserInfo({ isShowNav, setIsShowNav }) {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    return (
        <div className={cx('info-wrap')}>
            <Flex align="center" justify="between" gap={30} className={cx('wrap-btn')}>
                <Button ghost className={cx('back-btn')} onClick={() => navigate('/community')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Back
                </Button>
                <button className={cx('x-icon')} onClick={() => setIsShowNav(false)}>
                    <FontAwesomeIcon icon={faX} className="fa-lg" />
                </button>
            </Flex>
            <div className={cx('user-wrap')}>
                <Avatar src={handleAvatar(user.avatar)} />
                <Typography.Text className={cx('user-name')}>{user.name}</Typography.Text>
            </div>
        </div>
    );
}

export default UserInfo;
