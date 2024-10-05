import classNames from 'classnames/bind';
import styles from './UserRole.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserRole({ type }) {
    return (
        <div className={cx('wrap')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={type === 2 ? faGraduationCap : faChalkboard} />
            </span>
            <span className={cx('title')}>{type === 2 ? 'Student' : 'Teacher'}</span>
        </div>
    );
}

export default UserRole;
