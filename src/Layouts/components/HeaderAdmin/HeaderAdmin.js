import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo/Logo';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { logoutRequest } from '~/requestApi/requestSocial';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { refreshToken } from '~/requestApi/requestToken';
import { auth } from '~/firebase/config';
import Loading from '~/components/Loading/Loading';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function HeaderAdmin() {
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refresh_token = useSelector((state) => state.user.refresh_token);
    // Data
    const handleLogout = async () => {
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

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={cx('admin')}>
                <div className={cx('wrapper')}>
                    <div className={cx('left')}>
                        <div className={cx('logo-wrap')}>
                            <Logo white />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('user-wrap')}>
                            <div className={cx('avatar')}>
                                <img className={cx('avatar-img')} src={handleAvatar(user.avatar)} />
                                <div className={cx('info')}>
                                    <h3 className={cx('info-name')}>{user.name}</h3>
                                </div>
                            </div>
                            <Button type="primary" danger onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderAdmin;
