import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faHome, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertModal from '../AlertModal/AlertModal';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Navbar() {
    const user = useSelector((state) => state.user.user);
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
            title: 'Classes',
            to: `/classes/all`,
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} className="fa-xl" />,
            title: 'Blogs',
            to: `/blogs`,
        },
    ];
    const navTeacher = [
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
            title: 'Classes',
            to: `/classes/all`,
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} className="fa-xl" />,
            title: 'Blogs',
            to: `/blogs`,
        },
    ];
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const alert = JSON.parse(localStorage.getItem('ALERT'));
        if (!alert) {
            setShowNav(true);
        }
    }, []);

    return (
        <>
            <div className={cx('navbar')}>
                <ul className={cx('list')}>
                    {(Object.keys(user).length == 0 || user.role_id == 1 || user.role_id == 2) &&
                        navPublic.map((item, index) => (
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
                        ))}

                    {user.role_id == 3 &&
                        navTeacher.map((item, index) => (
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
                        ))}
                </ul>
                <div className={cx('alert')} onClick={() => setShowNav(true)}>
                    <span className={cx('alert-icon')}>
                        <FontAwesomeIcon icon={faBullhorn} className="fa-lg fa-solid fa-bell fa-shake" />
                    </span>
                </div>
            </div>
            <AlertModal showNav={showNav} setShowNav={setShowNav} />
        </>
    );
}

export default Navbar;
