import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    const nav = [
        {
            icon: <FontAwesomeIcon icon={faHome} className="fa-xl" />,
            title: 'Home',
        },
        {
            icon: <FontAwesomeIcon icon={faComment} className="fa-xl" />,
            title: 'Communicate',
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} className="fa-xl" />,
            title: 'Blogs',
        },
    ];
    return (
        <div className={cx('navbar')}>
            <ul className={cx('list')}>
                {nav.map((item, index) => {
                    return (
                        <Link key={index}>
                            <li className={cx('item')}>
                                <span className={cx('icon')}>{item.icon}</span>
                                <p className={cx('desc')}>{item.title}</p>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;
