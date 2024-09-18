import classNames from 'classnames/bind';
import styles from './TeacherNavbar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook, faComment, faHome, faPenRuler, faUsersLine } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TeacherNavbar({ showNav }) {
    const navItems = [
        {
            title: 'Your class',
            icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
            to: '',
        },
        {
            title: 'Design',
            icon: <FontAwesomeIcon className="fa-md" icon={faPenRuler} />,
            to: '/design',
        },
        {
            title: 'Courses',
            icon: <FontAwesomeIcon className="fa-md" icon={faBook} />,
            to: '/courses',
        },
        {
            title: 'Users',
            icon: <FontAwesomeIcon className="fa-md" icon={faUsersLine} />,
            to: '/users',
        },
        {
            title: 'All comments',
            icon: <FontAwesomeIcon className="fa-md" icon={faComment} />,
            to: '/comments',
        },
    ];
    return (
        <div className={cx('wrap', { show: showNav })}>
            <h2 className={cx('title')}>Navigation</h2>
            <ul className={cx('list')}>
                {navItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <NavLink
                                to={`/class/1${item.to}`}
                                className={(nav) => cx('item', { active: nav.isActive })}
                                end
                            >
                                <span className={cx('item-icon')}>{item.icon}</span>
                                <span className={cx('item-link')}>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TeacherNavbar;
