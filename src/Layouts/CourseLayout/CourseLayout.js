import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import CourseSidebar from '../components/CourseSidebar/CourseSidebar';
import CourseFooter from '../components/CourseFooter/CourseFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CourseLayout({ children }) {
    const [showNav, setShowNav] = useState(true);
    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>
                    Day la unit 1 nha !!Day la unit 1 nha !!Day la unit 1 nha !!Day la unit 1 nha !!Day la
                    unit 1 nha !!Day la unit 1 nha !!Day la unit 1 nha !!Day la unit 1 nha !!Day la unit 1 nha
                    !!Day la unit 1 nha !!Day la unit 1 nha !!
                </div>
                <CourseSidebar showNav={showNav} />
            </div>
            <CourseFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseLayout;
