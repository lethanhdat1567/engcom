import classNames from 'classnames/bind';
import styles from './StudentLesson.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLock } from '@fortawesome/free-solid-svg-icons';
import { validateIcon, validateText } from '~/utils/validateIcon';
import { useDispatch, useSelector } from 'react-redux';
import { course } from '~/redux/reducer/Course';

const cx = classNames.bind(styles);

function StudentLesson({ lesson, index, course_index }) {
    // redux
    const activeLessonID = useSelector((state) => state.course.activeLessonID);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    // handle logic
    const isCompleted = lesson.is_completed;
    const isInProgress = lesson.is_in_progress;
    const isBlocked = !isCompleted && !isInProgress && user.role_id !== 4;

    const handleClick = () => {
        if (!isBlocked) {
            dispatch(course.actions.setSelectedLesson(lesson));
            dispatch(course.actions.setActiveLessonID(lesson.id));
        }
    };
    return (
        <div
            className={cx('wrap', {
                blocked: isBlocked,
                active: activeLessonID === lesson.id,
            })}
            onClick={handleClick}
        >
            <span className={cx('decor')}>
                <FontAwesomeIcon icon={validateIcon(lesson.type)} />
            </span>
            <div className={cx('main')}>
                <h5 className={cx('title')}>
                    {Number(course_index) + 1}.{Number(index) + 1} {lesson.name}
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
