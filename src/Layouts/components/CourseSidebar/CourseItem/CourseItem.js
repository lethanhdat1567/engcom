import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Lesson from '../Lesson/Lesson';
import StudentLesson from '~/components/StudentLesson/StudentLesson';

const cx = classNames.bind(styles);

function CourseItem({ data }) {
    const [showLesson, setShowLesson] = useState(false);
    return (
        <div className={cx('course-wrap')}>
            <div className={cx('course')} onClick={() => setShowLesson(!showLesson)}>
                <div className={cx('course-header')}>
                    <h4 className={cx('title')}>{data.name}</h4>
                    <span className={cx('quantity')}>{data.lessons.length} lesson</span>
                </div>
                <span className={cx('course-icon', { active: showLesson })}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            <div className={cx('lesson-body', { show: showLesson })}>
                {data.lessons.map((item, index) => {
                    return <StudentLesson lesson={item} index={index} key={index} />;
                })}
            </div>
        </div>
    );
}

export default CourseItem;
