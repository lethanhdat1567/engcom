import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Lesson from '../Lesson/Lesson';
import StudentLesson from '~/components/StudentLesson/StudentLesson';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CourseItem({ data, course_index }) {
    const selectedLesson = useSelector((state) => state.course.selectedLesson);
    const [showLesson, setShowLesson] = useState(false);

    useEffect(() => {
        if (data.id === selectedLesson.course_id) {
            setShowLesson(true);
        }
    }, [selectedLesson]);

    return (
        <div className={cx('course-wrap')}>
            <div className={cx('course')} onClick={() => setShowLesson(!showLesson)}>
                <div className={cx('course-header')}>
                    <h4 className={cx('title')}>
                        {Number(course_index) + 1}. {data.name}
                    </h4>
                    <span className={cx('quantity')}>{data.lessons.length} lesson</span>
                </div>
                <span className={cx('course-icon', { active: showLesson })}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            <div className={cx('lesson-body', { show: showLesson })}>
                {data.lessons.map((item, index) => {
                    return (
                        <StudentLesson course_index={course_index} lesson={item} index={index} key={index} />
                    );
                })}
            </div>
        </div>
    );
}

export default CourseItem;
