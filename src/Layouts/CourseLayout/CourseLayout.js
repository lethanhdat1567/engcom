import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import CourseFooter from '../components/CourseFooter/CourseFooter';
import { useState } from 'react';
import CourseSidebarTeacher from '../components/CourseSideBarTeacher/CourseSidebarTeacher';
import { useSelector } from 'react-redux';
import CourseSidebar from '../components/CourseSidebar/CourseSidebar';
const cx = classNames.bind(styles);

function CourseLayout({ children }) {
    const [showNav, setShowNav] = useState(true);
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            {/* <HeaderCreateCourse /> */}
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>{children}</div>
                {/* Student */}
                {user.role_id === 2 && <CourseSidebar showNav={showNav} />}
                {/* Teacher */}
                {user.role_id === 3 && <CourseSidebarTeacher showNav={showNav} setShowNav={setShowNav} />}
            </div>
            <CourseFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseLayout;
