import classNames from 'classnames/bind';
import styles from './TeacherNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function NavList({ item }) {
    const [active, setActive] = useState(true);
    return (
        <li className={cx('item-wrap')}>
            <div className={cx('item-main')} onClick={() => setActive(!active)}>
                <div className={cx('item-left')}>
                    <span className={cx('item-icon-main')}>{item.icon}</span>
                    <span className={cx('item-desc')}>{item.title}</span>
                </div>
                <span className={cx('arrow')}>
                    <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} className="fa-md" />
                </span>
            </div>
            <ul className={cx('list-wrap', { active: active })}>
                {item.children?.map((item, index) => {
                    return (
                        <li key={index}>
                            <NavLink
                                to={`/class/1${item.to}`}
                                className={(nav) => cx('item-sub', { active: nav.isActive })}
                                end
                            >
                                <span className={cx('item-icon-sub')}>{item.icon}</span>
                                <span className={cx('item-link')}>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
}

export default NavList;
