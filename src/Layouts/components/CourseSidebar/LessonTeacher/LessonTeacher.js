import classNames from 'classnames/bind';
import styles from './LessonTeacher.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { validateIcon, validateText } from '~/utils/validateIcon';
import { activeLesson } from '~/redux/reducer/ActiveLesson';
const cx = classNames.bind(styles);

function LessonTeacher({ data, index }) {
    const dispatch = useDispatch();
    const currentLesson = useSelector((state) => state.activeLesson.lesson);

    return (
        <div className={cx('wrap', { active: currentLesson.id === data.id })}>
            <span className={cx('decor')}>{<FontAwesomeIcon icon={validateIcon(data.type)} />}</span>
            <div className={cx('main')} onClick={() => dispatch(activeLesson.actions.setActiveLesson(data))}>
                <h5 className={cx('title')}>
                    1.{index + 1} {data.title}
                </h5>
                <span className={cx('sub-title')}>{validateText(data.type)}</span>
            </div>
            <span className={cx('check')} onClick={() => dispatch(teacher.actions.deleteLesson(data.id))}>
                <span
                    className={cx('btn-delete')}
                    onClick={() => dispatch(activeLesson.actions.deleteActiveLesson())}
                >
                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }} />
                </span>
            </span>
        </div>
    );
}

export default LessonTeacher;
