import classNames from 'classnames/bind';
import styles from './CourseTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CreateLesson from '../Lesson/CreateLesson';
import Lesson from '../../CourseSidebar/Lesson/Lesson';

const cx = classNames.bind(styles);

function CourseTeacher() {
    const [showLesson, setShowLesson] = useState(false);
    return (
        <div className={cx('course-wrap', { show: showLesson })}>
            <div className={cx('course')} onClick={() => setShowLesson(!showLesson)}>
                <div className={cx('course-header')}>
                    <h4 className={cx('title')}>1. Unit 1</h4>
                    <span className={cx('quantity')}>3/3 lesson</span>
                </div>
                <span className={cx('course-icon', { active: showLesson })}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            <div className={cx('lesson-body', { show: showLesson })}>
                <CreateLesson />
                <Lesson />
                <Lesson />
                <Lesson />
            </div>
        </div>
    );
}

export default CourseTeacher;
