import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Profile from '../Profile/Profile';
import Sercurity from '../Sercurity/Sercurity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Content({ isActive, setActive }) {
    const components = [<Profile />, <Sercurity />];

    return (
        <div className={cx('wrap', { active: isActive >= 0 })}>
            <Link to={`${process.env.REACT_APP_ROOT}/profile`} className={cx('out')}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </Link>
            <span className={cx('x-mark')} onClick={() => setActive(-1)}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
            {components[isActive]}
        </div>
    );
}

export default Content;
