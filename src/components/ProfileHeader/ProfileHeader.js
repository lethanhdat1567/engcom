import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { logoutRequest } from '~/requestApi/requestSocial';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import Img from '../Img';

const cx = classNames.bind(styles);

function ProfileHeader() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            await logoutRequest();
            dispatch(usersSlice.actions.logoutUser());
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error signing out:', error);
        }
    };
    return (
        <li className={cx('item')}>
            {loading && <Loading />}
            <Tippy
                interactive
                trigger="click"
                placement="bottom-end"
                render={(attrs) => (
                    <div {...attrs} className={cx('profile-drop')}>
                        <Link>
                            <div className={cx('profile-info')}>
                                <img className={cx('profile-avatar')} src={user.avatar} />
                                <div className={cx('profile-user')}>
                                    <h2 className={cx('profile-name')}>{user.name}</h2>
                                    <h2 className={cx('profile-email')}>{user.email}</h2>
                                </div>
                            </div>
                        </Link>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/profile`}
                                    className={cx('profile-item-link')}
                                >
                                    Trang ca nhan
                                </Link>
                            </li>
                        </ul>
                        <div className={cx('response')}>
                            <hr />
                            <ul className={cx('profile-list')}>
                                <li className={cx('profile-item')}>
                                    <Link
                                        to={`${process.env.REACT_APP_ROOT}/profile`}
                                        className={cx('profile-item-link')}
                                    >
                                        My Classes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/new-post`}
                                    className={cx('profile-item-link')}
                                >
                                    Viet Blogs
                                </Link>
                            </li>
                            <li className={cx('profile-item')}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/me/post`}
                                    className={cx('profile-item-link')}
                                >
                                    Bai viet cua toi
                                </Link>
                            </li>
                            <li className={cx('profile-item')}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/me/bookmark`}
                                    className={cx('profile-item-link')}
                                >
                                    Bai viet da luu
                                </Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}>Cai dat</Link>
                            </li>
                            <li className={cx('profile-item')} onClick={handleLogout}>
                                <Link className={cx('profile-item-link')}>Dang xuat</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('avatar')}>
                    <Img
                        className={cx('avatar-img')}
                        src={
                            user.avatar.includes('googleusercontent.com') ||
                            user.avatar.includes('facebook.com')
                                ? user.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                        }
                        alt="User Avatar"
                    />
                </div>
            </Tippy>
        </li>
    );
}

export default ProfileHeader;
