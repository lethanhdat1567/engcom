import classNames from 'classnames/bind';
import styles from './ProfileForum.module.scss';
import { Avatar } from 'antd';
import UserRole from '~/components/UserRole/UserRole';
import PostItem from '../PostItem/PostItem';

const cx = classNames.bind(styles);

function ProfileForum() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('info-user')}>
                    <span className={cx('name')}>Le Thanh Dat</span>
                    <UserRole type={2} />
                </div>
                <Avatar size="large">A</Avatar>
            </div>
            <div className={cx('body')}>
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
        </div>
    );
}

export default ProfileForum;
