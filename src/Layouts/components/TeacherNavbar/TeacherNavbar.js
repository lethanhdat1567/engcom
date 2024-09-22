import classNames from 'classnames/bind';
import styles from './TeacherNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faComment, faEye, faHome, faUsersLine, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import NavList from './NavList';
import { edit, view } from '~/assets/Icon';

const cx = classNames.bind(styles);

function TeacherNavbar({ showNav, setShowNav }) {
    const navItems = [
        {
            title: 'Design',
            icon: edit,
            children: [
                {
                    title: 'Your class',
                    icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
                    to: '',
                },
                {
                    title: 'Courses',
                    icon: <FontAwesomeIcon className="fa-md" icon={faBook} />,
                    to: '/courses',
                },
            ],
        },
        {
            title: 'View',
            icon: view,
            children: [
                {
                    title: 'OverView',
                    icon: <FontAwesomeIcon className="fa-md" icon={faEye} />,
                    to: '/overview',
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
            ],
        },
    ];
    return (
        <div className={cx('wrap', { show: showNav })}>
            <div className={cx('head-wrap')}>
                <h2 className={cx('title')}>Navigation</h2>
                <span className={cx('x-mark')} onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                </span>
            </div>
            <ul className={cx('list')}>
                {navItems.map((item, index) => {
                    return <NavList item={item} key={index} />;
                })}
            </ul>
            <Button classNames={cx('export-btn')}>Export class</Button>
        </div>
    );
}

export default TeacherNavbar;
