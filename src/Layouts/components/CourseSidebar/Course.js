import classNames from 'classnames/bind';
import styles from './CourseSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Lesson from './Lesson/Lesson';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Course() {
    const [showLesson, setShowLesson] = useState(false);
    return (
        <div className={cx('course-wrap')} onClick={() => setShowLesson(!showLesson)}>
            <div className={cx('course')}>
                <div className={cx('course-header')}>
                    <h4 className={cx('title')}>1. Unit 1</h4>
                    <span className={cx('quantity')}>3/3 lesson</span>
                </div>
                <span className={cx('course-icon', { active: showLesson })}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            <div className={cx('lesson-body')}>
                <Lesson show={showLesson} />
                <Lesson show={showLesson} />
                <Lesson show={showLesson} />
            </div>
        </div>
    );
}

export default Course;
