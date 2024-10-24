import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import Logo from '~/components/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Navbar({ isActive, setActive }) {
    const user = useSelector((state) => state.user.user);

    const navItems = [
        {
            title: 'Thong tin ca nhan',
            icon: <FontAwesomeIcon icon={faUser} className="fa-lg" />,
        },
        {
            title: 'Mat khau va bao mat',
            icon: <FontAwesomeIcon icon={faShield} className="fa-lg" />,
        },
    ];
    const singleNav = [
        {
            title: 'Thong tin ca nhan',
            icon: <FontAwesomeIcon icon={faUser} className="fa-lg" />,
        },
    ];

    const handleActive = (index) => {
        setActive(index);
    };
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/profile`} className={cx('out-nav')}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </Link>
            <Logo />
            <h1 className={cx('title')}>Cai dat tai khoan</h1>
            <p className={cx('desc')}>
                Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo,
                v.v.
            </p>
            <div className={cx('nav-wrap')}>
                {user.uid
                    ? singleNav.map((item, index) => {
                          return (
                              <NavItem
                                  isActive={isActive === index}
                                  data={item}
                                  key={index}
                                  onClick={() => handleActive(index)}
                              />
                          );
                      })
                    : navItems.map((item, index) => {
                          return (
                              <NavItem
                                  isActive={isActive === index}
                                  data={item}
                                  key={index}
                                  onClick={() => handleActive(index)}
                              />
                          );
                      })}
            </div>
        </div>
    );
}

export default Navbar;
