import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import CourseFooter from '../components/CourseFooter/CourseFooter';
import { useState } from 'react';
import CourseSidebarTeacher from '../components/CourseSideBarTeacher/CourseSidebarTeacher';
const cx = classNames.bind(styles);

function CourseLayout({ children }) {
    const [showNav, setShowNav] = useState(true);

    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            {/* <HeaderCreateCourse /> */}
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>{children}</div>
                {/* Student */}
                {/* <CourseSidebar showNav={showNav} /> */}
                {/* Teacher */}
                <CourseSidebarTeacher showNav={showNav} setShowNav={setShowNav} />
            </div>
            <CourseFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseLayout;
