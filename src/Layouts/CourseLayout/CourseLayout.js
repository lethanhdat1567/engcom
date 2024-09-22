import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import CourseSidebar from '../components/CourseSidebar/CourseSidebar';
import CourseFooter from '../components/CourseFooter/CourseFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CourseSidebarTeacher from '../components/CourseSideBarTeacher/CourseSidebarTeacher';
import HeaderCreateCourse from '../components/HeaderCreateCourse.js/HeaderCreateCourse';

const cx = classNames.bind(styles);

function CourseLayout({ children }) {
    const [showNav, setShowNav] = useState(true);
    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            {/* <HeaderCreateCourse /> */}
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>{children}</div>
                {/* <CourseSidebar showNav={showNav} /> */}
                <CourseSidebarTeacher showNav={showNav} setShowNav={setShowNav} />
            </div>
            <CourseFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseLayout;
