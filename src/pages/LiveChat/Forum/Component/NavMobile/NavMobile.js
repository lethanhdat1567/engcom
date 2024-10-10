import classNames from 'classnames/bind';
import styles from './NavMobile.module.scss';
import { home, homeActive } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUser as userSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookOpenReader, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavMobile({ activeIndex, setActiveIndex }) {
    const navData = [
        {
            icon: home,
            activeIcon: homeActive,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} style={{ width: '100%' }} className="fa-xl" />,
            activeIcon: <FontAwesomeIcon icon={userSolid} style={{ width: '100%' }} className="fa-xl" />,
        },
    ];
    return (
        <div className={cx('nav-wrap')}>
            <nav className={cx('navbar')}>
                <Link to={`${process.env.REACT_APP_ROOT}/community`} className={cx('out-nav')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </Link>
                <ul className={cx('list')}>
                    {navData.map((item, index) => {
                        return (
                            <li
                                className={cx('item', { active: activeIndex === index })}
                                key={index}
                                onClick={() => setActiveIndex(index)}
                            >
                                <span className={cx('icon')}>{item.icon}</span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default NavMobile;
