import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '~/components/Search';
import Logo from '~/components/Logo/Logo';
import { useEffect, useState } from 'react';
import Validate from '~/pages/Validate';
import PrivateHeader from './PrivateHeader/PrivateHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PublicHeader from './PublicHeader/PublicHeader';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '~/requestApi/requestToken';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { getSubscribe } from '~/requestApi/requestSubscribe';
import { subscribeClass } from '~/redux/reducer/SubscribeSlice';
import { getSaveBlog } from '~/requestApi/requestBlog';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { activeLesson } from '~/redux/reducer/ActiveLesson';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const [regisModal, setRegisModal] = useState(false);
    const [LoginModal, setloginModal] = useState(false);
    const user = useSelector((state) => state.user.user);
    const refresh_token = useSelector((state) => state.user.refresh_token);
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            if (token) {
                refreshToken(refresh_token)
                    .then((res) => {
                        dispatch(usersSlice.actions.getToken(res.data.access_token));
                        dispatch(usersSlice.actions.getRefreshToken(res.data.refresh_token));
                    })
                    .catch((error) => console.log(error));
            }
        }, (3600 - 300) * 1000);

        return () => clearInterval(interval);
    }, [refresh_token, dispatch]);
    useEffect(() => {
        if (user) {
            getSubscribe(user.id)
                .then((res) => {
                    dispatch(subscribeClass.actions.getFree(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
            getSaveBlog(user.id)
                .then((res) => {
                    dispatch(ownData.actions.getSaveBlog(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    useEffect(() => {
        dispatch(teacher.actions.resetState());
        dispatch(activeLesson.actions.deleteActiveLesson());
    }, []);

    return (
        <>
            <header className={cx('header')}>
                <div className={cx('wrap')}>
                    <Logo />
                </div>
                <Search />
                {user.id && user.role_id ? (
                    <PrivateHeader />
                ) : (
                    <PublicHeader
                        registerModal={regisModal}
                        setToggleRegister={setRegisModal}
                        loginModal={LoginModal}
                        setToggleLoginr={setloginModal}
                    />
                )}
            </header>
            {regisModal && <Validate toggle={regisModal} setToggle={setRegisModal} field="Register" />}
            {LoginModal && <Validate toggle={LoginModal} setToggle={setloginModal} field="Login" />}
        </>
    );
}

export default Header;
