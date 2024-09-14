import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '~/components/Search';
import Logo from '~/components/Logo/Logo';
import { useState } from 'react';
import Validate from '~/pages/Validate';
import PrivateHeader from './PrivateHeader/PrivateHeader';

const cx = classNames.bind(styles);

function Header() {
    const [regisModal, setRegisModal] = useState(false);
    const [LoginModal, setloginModal] = useState(false);
    return (
        <>
            <header className={cx('header')}>
                <Logo />
                <Search />
                {/* <PublicHeader toggle={regisModal} setToggle={setRegisModal} /> */}
                <PrivateHeader />
            </header>
            {regisModal && <Validate toggle={regisModal} setToggle={setRegisModal} field="Register" />}
            {LoginModal && <Validate toggle={LoginModal} setToggle={setloginModal} field="Login" />}
        </>
    );
}

export default Header;
