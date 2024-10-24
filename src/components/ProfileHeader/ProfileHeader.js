import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { logoutRequest } from '~/requestApi/requestSocial';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import Img from '../Img';
import { refreshToken } from '~/requestApi/requestToken';

const cx = classNames.bind(styles);

function ProfileHeader() {
    const refresh_token = useSelector((state) => state.user.refresh_token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        setShowDropdown(false);
        setLoading(true);

        try {
            await signOut(auth);
            await logoutRequest();
            dispatch(usersSlice.actions.logoutUser());
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);

            try {
                const res = await refreshToken(refresh_token);
                dispatch(usersSlice.actions.getToken(res.data.access_token));
                dispatch(usersSlice.actions.getRefreshToken(res.data.refresh_token));

                await signOut(auth);
                await logoutRequest();
                dispatch(usersSlice.actions.logoutUser());
                navigate('/');
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className={cx('item')}>
            {loading && <Loading />}
            <Tippy
                interactive
                onClickOutside={() => setShowDropdown(false)}
                visible={showDropdown}
                placement="bottom-end"
                render={(attrs) => (
                    <div {...attrs} className={cx('profile-drop')}>
                        <Link>
                            <div className={cx('profile-info')}>
                                <Img
                                    className={cx('profile-avatar')}
                                    src={
                                        user?.avatar?.includes('googleusercontent.com') ||
                                        user?.avatar?.includes('facebook.com')
                                            ? user.avatar
                                            : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                                    }
                                    alt="User Avatar"
                                />
                                <div className={cx('profile-user')}>
                                    <h2 className={cx('profile-name')}>{user.name}</h2>
                                    <h2 className={cx('profile-email')}>{user.email}</h2>
                                </div>
                            </div>
                        </Link>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')} onClick={() => setShowDropdown(false)}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/profile`}
                                    className={cx('profile-item-link')}
                                >
                                    My profile
                                </Link>
                            </li>
                        </ul>
                        <div className={cx('response')}>
                            <hr />
                            <ul className={cx('profile-list')}>
                                <li className={cx('profile-item')} onClick={() => setShowDropdown(false)}>
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
                            <li className={cx('profile-item')} onClick={() => setShowDropdown(false)}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/new-post`}
                                    className={cx('profile-item-link')}
                                >
                                    Write Blogs
                                </Link>
                            </li>
                            <li className={cx('profile-item')} onClick={() => setShowDropdown(false)}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/me/post`}
                                    className={cx('profile-item-link')}
                                >
                                    My blogs
                                </Link>
                            </li>
                            <li className={cx('profile-item')} onClick={() => setShowDropdown(false)}>
                                <Link
                                    to={`${process.env.REACT_APP_ROOT}/me/bookmark`}
                                    className={cx('profile-item-link')}
                                >
                                    Saved blogs
                                </Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')} onClick={handleLogout}>
                                <Link className={cx('profile-item-link')}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('avatar')} onClick={() => setShowDropdown(true)}>
                    <Img
                        className={cx('avatar-img')}
                        src={
                            user?.avatar?.includes('googleusercontent.com') ||
                            user?.avatar?.includes('facebook.com')
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
