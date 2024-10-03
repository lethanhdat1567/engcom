import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import { useState } from 'react';
import CourseSidebarTeacher from '../components/CourseSideBarTeacher/CourseSidebarTeacher';
import { useSelector } from 'react-redux';
import CourseFooterCreate from '../components/CourseFooterCreate/CourseFooter';
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
                {/* Teacher */}
                {user.role_id === 3 && <CourseSidebarTeacher showNav={showNav} setShowNav={setShowNav} />}
            </div>
            <CourseFooterCreate showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseLayout;
