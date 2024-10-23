import classNames from 'classnames/bind';
import styles from './ProfileCourse.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { handleAvatar } from '~/utils/handleAvatar';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { logoutRequest } from '~/requestApi/requestSocial';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { auth } from '~/firebase/config';
import { refreshToken } from '~/requestApi/requestToken';
import Loading from '../Loading/Loading';

const cx = classNames.bind(styles);

function ProfileCourse() {
    const user = useSelector((state) => state.user.user);
    const refresh_token = useSelector((state) => state.user.refresh_token);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            await logoutRequest();
            dispatch(usersSlice.actions.logoutUser());
            navigate('/');
        } catch (error) {
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

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('wrap')}>
            <li className={cx('item')}>
                <Tippy
                    interactive
                    trigger="click"
                    placement="bottom-end"
                    render={(attrs) => (
                        <div {...attrs} className={cx('profile-drop')}>
                            <Link>
                                <div className={cx('profile-info')}>
                                    <img className={cx('profile-avatar')} src={handleAvatar(user.avatar)} />
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
                                <li className={cx('profile-item')}>
                                    <Link className={cx('profile-item-link')} onClick={handleLogout}>
                                        Dang xuat
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div className={cx('avatar')}>
                        <img className={cx('avatar-img')} src={handleAvatar(user.avatar)} />
                        <div className={cx('info')}>
                            <h3 className={cx('info-name')}>{user.name}</h3>
                            <span className={cx('icon-info')}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </div>
                    </div>
                </Tippy>
            </li>
        </div>
    );
}

export default ProfileCourse;
