import classNames from 'classnames/bind';
import styles from './TeacherClassLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import { useState } from 'react';
import TeacherNavbar from '../components/TeacherNavbar/TeacherNavbar';
import TeacherFooter from '../components/TeacherFooter/TeacherFooter';
import HeaderCreateCourse from '../components/HeaderCreateCourse.js/HeaderCreateCourse';

const cx = classNames.bind(styles);

function TeacherClassLayout({ children }) {
    const [showNav, setShowNav] = useState(true);
    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            <div className={cx('body')}>
                <TeacherNavbar showNav={showNav} />
                <div className={cx('content', { full: !showNav })}>{children}</div>
            </div>
            <TeacherFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default TeacherClassLayout;
