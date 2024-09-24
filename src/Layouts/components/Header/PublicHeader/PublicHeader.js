import classNames from 'classnames/bind';
import styles from '../Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function PublicHeader({ registerModal, setToggleRegister, loginModal, setToggleLoginr }) {
    return (
        <div className={cx('btn-wrap')}>
            <Button classNames={cx('register')} onClick={() => setToggleRegister(true)}>
                Register
            </Button>
            <Button onClick={() => setToggleLoginr(true)} primary>
                Login
            </Button>
        </div>
    );
}

export default PublicHeader;
