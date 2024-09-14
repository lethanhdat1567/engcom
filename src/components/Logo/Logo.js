import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Logo({ white, className = false }) {
    return (
        <Link to={'/'} className={cx('logo', `${className}`)}>
            <span className={cx('logo-icon', { white: white })}>
                <FontAwesomeIcon icon={faBookOpenReader} className="fa-xl" />
            </span>
            <p className={cx('logo-desc', { white: white })}>English Community</p>
        </Link>
    );
}

export default Logo;
