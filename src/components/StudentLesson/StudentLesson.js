import classNames from 'classnames/bind';
import styles from './StudentLesson.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLock } from '@fortawesome/free-solid-svg-icons';
import { validateIcon, validateText } from '~/utils/validateIcon';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function StudentLesson({ lesson, index }) {
    // redux
    const activeLessonID = useSelector((state) => state.course.activeLessonID);
    // handle logic
    const isCompleted = lesson.is_completed;
    const isInProgress = lesson.is_in_progress;
    const isBlocked = !isCompleted && !isInProgress;
    return (
        <div className={cx('wrap', { blocked: isBlocked, active: activeLessonID === lesson.id })}>
            <span className={cx('decor')}>
                <FontAwesomeIcon icon={validateIcon(lesson.type)} />
            </span>
            <div className={cx('main')}>
                <h5 className={cx('title')}>
                    1.{index + 1} {lesson.name}
                </h5>
                <span className={cx('sub-title')}>{validateText(lesson.type)}</span>
            </div>
            {isCompleted && !isInProgress ? <span className={cx('check')}>{checked}</span> : ''}
            {isBlocked && (
                <span className={cx('check')}>
                    <FontAwesomeIcon icon={faLock} />
                </span>
            )}
        </div>
    );
}

export default StudentLesson;
