import classNames from 'classnames/bind';
import styles from './ProfileForum.module.scss';
import { Avatar } from 'antd';
import UserRole from '~/components/UserRole/UserRole';
import PostItem from '../PostItem/PostItem';
import { useSelector } from 'react-redux';
import { handleAvatar } from '~/utils/handleAvatar';
import { useEffect, useState } from 'react';
import { getProfilePost } from '~/requestApi/requestPost';
import ForumItemLoading from '~/components/Loading/ForumItemLoading/ForumItemLoading';

const cx = classNames.bind(styles);

function ProfileForum() {
    const user = useSelector((state) => state.user.user);
    const [postValues, setPostValues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProfilePost(user.id)
            .then((res) => {
                setPostValues(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
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
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => <ForumItemLoading key={index} />)
                ) : postValues.length > 0 ? (
                    postValues.map((item, index) => (
                        <PostItem
                            post={item}
                            key={index}
                            setPostValues={setPostValues}
                            postValues={postValues}
                        />
                    ))
                ) : (
                    <span className={cx('sub')}>You don't have any posts yet</span>
                )}
            </div>
        </div>
    );
}

export default ProfileForum;
