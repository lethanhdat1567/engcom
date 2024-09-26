import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { validateIcon } from '~/utils/validateIcon';
const cx = classNames.bind(styles);

function Lesson({ data, index }) {
    return (
        <div className={cx('wrap')}>
            <span className={cx('decor')}>
                <FontAwesomeIcon icon={faBook} />
            </span>
            <div className={cx('main')}>
                <h5 className={cx('title')}>
                    1.{index + 1} {data.title}
                </h5>
                <span className={cx('sub-title')}>{<FontAwesomeIcon icon={validateIcon(3)} />}</span>
            </div>
            <span className={cx('check')}>{checked}</span>
        </div>
    );
}

export default Lesson;
