import classNames from 'classnames/bind';
import styles from './HeaderSingle.module.scss';
import Logo from '~/components/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PrivateHeader from '../Header/PrivateHeader/PrivateHeader';
import HeaderAlert from '~/components/HeaderAlert/HeaderAlert';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderSingle() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <Link to="/" className={cx('logo')}>
                    <FontAwesomeIcon icon={faBookOpenReader} className="fa-xl" />
                </Link>
                <div className={cx('back-wrap')}>
                    <span className={cx('icon')}>
                        <span className={cx('font-icon')}>
                            <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                        </span>
                        <span className={cx('back-desc')}>Back</span>
                    </span>
                </div>
            </div>
            <div className={cx('right')}>
                <HeaderAlert />
                <ProfileHeader />
            </div>
        </div>
    );
}

export default HeaderSingle;
