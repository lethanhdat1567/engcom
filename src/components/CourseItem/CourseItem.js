import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LessonItem from './LessonItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CourseItem({ data }) {
    const lessons = useSelector((state) => state.teacher.lessons);

    const lessonData = lessons.filter((item) => item.course_id === data.id);
    return (
        <div className={cx('course')}>
            <div className={cx('wrap')}>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>{data.title}</h3>
                    <p className={cx('lesson')}>{lessonData.length} lessons</p>
                </div>
                <span className={cx('arrow')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>
        </div>
    );
}

export default CourseItem;
