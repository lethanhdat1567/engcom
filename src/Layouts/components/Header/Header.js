import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Search';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import Logo from '~/components/Logo/Logo';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('header')}>
            <Logo />
            <Search />
            <div className={cx('btn-wrap')}>
                <Button>Register</Button>
                <Button primary>Login</Button>
            </div>
        </header>
    );
}

export default Header;
