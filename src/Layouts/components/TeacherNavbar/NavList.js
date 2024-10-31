import classNames from 'classnames/bind';
import styles from './TeacherNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function NavList({ item }) {
    const [active, setActive] = useState(true);
    const { slug } = useParams();
    const cartDataRedux = useSelector((state) => state.teacher.carts);
    const cartData = useSelector((state) => state.teacher.carts);
    const courses = useSelector((state) => state.teacher.courses);

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
            <ul className={cx('list-wrap', { active })}>
                {item.children?.map((childItem, index) => {
                    let store = null;
                    if (childItem.title == 'Your class') {
                        store = cartData; // Đây là đối tượng
                    } else if (childItem.title == 'Courses') {
                        store = courses; // Đây là mảng
                    }
                    return (
                        <li key={index}>
                            <NavLink
                                to={`/${childItem.to}`}
                                className={({ isActive }) => cx('item-sub', { active: isActive })}
                                end
                            >
                                <span className={cx('item-icon-sub')}>{childItem.icon}</span>
                                <span className={cx('item-link')}>{childItem.title}</span>
                                {!slug &&
                                    childItem.title == 'Your class' &&
                                    Object.keys(cartDataRedux).length == 0 && (
                                        <span style={{ color: 'red' }} className={cx('null-alert')}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </span>
                                    )}
                                {!slug && childItem.title == 'Courses' && courses.length == 0 && (
                                    <span style={{ color: 'red' }} className={cx('null-alert')}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
}

export default NavList;
