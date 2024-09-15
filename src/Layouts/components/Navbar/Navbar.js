import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    const navPublic = [
        {
            icon: <FontAwesomeIcon icon={faHome} className="fa-xl" />,
            title: 'Home',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faUsers} className="fa-xl" />,
            title: 'Community',
            to: '/community',
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} className="fa-xl" />,
            title: 'Blogs',
            to: `/blogs`,
        },
    ];
    return (
        <div className={cx('navbar')}>
            <ul className={cx('list')}>
                {navPublic.map((item, index) => {
                    return (
                        <NavLink
                            to={item.to}
                            key={index}
                            className={(nav) => cx('item', { active: nav.isActive })}
                        >
                            <li className={cx('item-sub')}>
                                <span className={cx('icon')}>{item.icon}</span>
                                <p className={cx('desc')}>{item.title}</p>
                            </li>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;
