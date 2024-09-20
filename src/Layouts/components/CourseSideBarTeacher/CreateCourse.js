import classNames from 'classnames/bind';
import styles from './CourseSidebarTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import CreateLesson from './Lesson/CreateLesson';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CreateCourse({ setShowCreate }) {
    const [courseValue, setCourseValue] = useState('');
    return (
        <div className={cx('course-wrap')}>
            <div className={cx('course')}>
                <div className={cx('course-header')}>
                    <div className={cx('title')}>
                        1.
                        <input
                            className={cx('course-input')}
                            onChange={(e) => setCourseValue(e.target.value)}
                            placeholder="Your title..."
                        />
                    </div>
                    <span className={cx('quantity')}>-/- lesson</span>
                </div>
                {courseValue && (
                    <Tippy content="Create course">
                        <span className={cx('course-icon')} onClick={() => setShowCreate(false)}>
                            <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} />
                        </span>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default CreateCourse;
