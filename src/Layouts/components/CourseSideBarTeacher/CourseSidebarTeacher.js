import classNames from 'classnames/bind';
import styles from './CourseSidebarTeacher.module.scss';
import CreateCourse from './CreateCourse';
import { useState } from 'react';
import CreateLesson from './Lesson/CreateLesson';
import CourseTeacher from './CourseTeacher/CourseTeacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CourseSidebarTeacher({ showNav, setShowNav }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <div className={cx('navbar', { show: showNav })}>
            <div className={cx('head-wrap')}>
                <h2 className={cx('title')}>Courses</h2>
                <span className={cx('x-mark')} onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                </span>
            </div>
            <div className={cx('create-course-wrap')} onClick={() => setShowCreate(!showCreate)}>
                <button className={cx('create-course')} style={{ background: showCreate ? 'red' : 'blue' }}>
                    {showCreate ? 'Delete' : 'Create'} Course
                </button>
            </div>
            {showCreate && <CreateCourse setShowCreate={setShowCreate} />}
            <CourseTeacher />
        </div>
    );
}

export default CourseSidebarTeacher;
