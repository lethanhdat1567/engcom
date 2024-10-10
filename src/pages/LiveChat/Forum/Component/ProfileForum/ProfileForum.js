import classNames from 'classnames/bind';
import styles from './ProfileForum.module.scss';
import { Avatar } from 'antd';
import UserRole from '~/components/UserRole/UserRole';
import PostItem from '../PostItem/PostItem';
import { useSelector } from 'react-redux';
import { handleAvatar } from '~/utils/handleAvatar';
import { useEffect, useState } from 'react';
import { getProfilePost } from '~/requestApi/requestPost';

const cx = classNames.bind(styles);

function ProfileForum() {
    const user = useSelector((state) => state.user.user);
    const [postValues, setPostValues] = useState([]);

    useEffect(() => {
        getProfilePost(user.id)
            .then((res) => {
                setPostValues(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <Avatar size="large" src={handleAvatar(user.avatar)} />
                <div className={cx('info-user')}>
                    <span className={cx('name')}>{user.name}</span>
                    <UserRole type={user.role_id} />
                </div>
            </div>
            <div className={cx('body')}>
                {postValues.map((item, index) => {
                    return (
                        <PostItem
                            post={item}
                            key={index}
                            setPostValues={setPostValues}
                            postValues={postValues}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProfileForum;
