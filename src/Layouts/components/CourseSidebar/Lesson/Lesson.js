import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Lesson({ show = false }) {
    return (
        <div className={cx('wrap', { show })}>
            <span className={cx('decor')}>
                <FontAwesomeIcon icon={faBook} />
            </span>
            <div className={cx('main')}>
                <h5 className={cx('title')}>1.1 Welcome to our class! Welcome to our class</h5>
                <span className={cx('sub-title')}>lesson</span>
            </div>
            <span className={cx('check')}>{checked}</span>
        </div>
    );
}

export default Lesson;
