import classNames from 'classnames/bind';
import styles from '../Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function PublicHeader({ toggle, setToggle }) {
    return (
        <div className={cx('btn-wrap')}>
            <Button classNames={cx('register')} onClick={() => setToggle(true)}>
                Register
            </Button>
            <Button onClick={() => setToggle(true)} primary>
                Login
            </Button>
        </div>
    );
}

export default PublicHeader;
