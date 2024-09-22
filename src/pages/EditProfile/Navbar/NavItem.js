import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavItem({ data, onClick, isActive }) {
    return (
        <Link onClick={onClick}>
            <div className={cx('nav-item', { active: isActive })}>
                <span className={cx('nav-item-icon')}>{data.icon}</span>
                <span className={cx('nav-item-title')}>{data.title}</span>
            </div>
        </Link>
    );
}

export default NavItem;
