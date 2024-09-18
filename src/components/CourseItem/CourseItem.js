import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LessonItem from './LessonItem';

const cx = classNames.bind(styles);

function CourseItem() {
    return (
        <div className={cx('course')}>
            <div className={cx('wrap')}>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>Unit 1</h3>
                    <p className={cx('lesson')}>3 lessons</p>
                </div>
                <span className={cx('arrow')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>
        </div>
    );
}

export default CourseItem;
