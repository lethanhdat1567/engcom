import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '~/components/Search';
import Logo from '~/components/Logo/Logo';
import { useState } from 'react';
import Validate from '~/pages/Validate';
import PrivateHeader from './PrivateHeader/PrivateHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PublicHeader from './PublicHeader/PublicHeader';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Header() {
    const [regisModal, setRegisModal] = useState(false);
    const [LoginModal, setloginModal] = useState(false);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const location = useLocation();

    const showBackButton =
        location.pathname !== '/' && location.pathname !== '/community' && location.pathname !== '/blogs';
    return (
        <>
            <header className={cx('header')}>
                <div className={cx('wrap')}>
                    {showBackButton ? (
                        <>
                            <div className={cx('logo')}>
                                <Logo />
                            </div>
                            <div className={cx('back-wrap')} onClick={() => navigate(-1)}>
                                <span className={cx('icon')}>
                                    <span className={cx('font-icon')}>
                                        <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                                    </span>
                                    <span className={cx('back-desc')}>Back</span>
                                </span>
                            </div>
                        </>
                    ) : (
                        <Logo />
                    )}
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
