import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo/Logo';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { logoutRequest } from '~/requestApi/requestSocial';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { refreshToken } from '~/requestApi/requestToken';
import { auth } from '~/firebase/config';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function HeaderAdmin() {
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
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            console.error('Error signing out:', error);
            refreshToken(refresh_token)
                .then((res) => {
                    dispatch(usersSlice.actions.getToken(res.data.access_token));
                    dispatch(usersSlice.actions.getRefreshToken(res.data.refresh_token));
                })
                .catch((error) => console.log(error));
        }
    };
    const items = [
        {
            key: '1',
            label: <Link className={cx('alert-item')}>Setting</Link>,
        },
        {
            key: '2',
            label: (
                <Link className={cx('alert-item')} onClick={handleLogout}>
                    Logout
                </Link>
            ),
        },
    ];

    const dropdownAlert = () => {
        return (
            <div className={cx('alert-dropdown')}>
                <h3 className={cx('head')}>Your notification</h3>
            </div>
        );
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
                            <Space direction="vertical">
                                <Space wrap size={'large'}>
                                    <Dropdown
                                        trigger="click"
                                        dropdownRender={dropdownAlert}
                                        placement="bottom"
                                        arrow
                                    >
                                        <FontAwesomeIcon icon={faBell} className={cx('icon', 'fa-xl')} />
                                    </Dropdown>
                                </Space>
                            </Space>
                            <ProfileCourse />
                            <Space direction="vertical">
                                <Space wrap>
                                    <Dropdown trigger="click" menu={{ items }} placement="">
                                        <FontAwesomeIcon icon={faGear} className={cx('icon', 'fa-xl')} />
                                    </Dropdown>
                                </Space>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderAdmin;
