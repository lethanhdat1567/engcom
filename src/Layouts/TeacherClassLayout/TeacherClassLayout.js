import classNames from 'classnames/bind';
import styles from './TeacherClassLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import { useEffect, useState } from 'react';
import TeacherNavbar from '../components/TeacherNavbar/TeacherNavbar';
import TeacherFooter from '../components/TeacherFooter/TeacherFooter';
import HeaderCreateCourse from '../components/HeaderCreateCourse.js/HeaderCreateCourse';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { activeLesson } from '~/redux/reducer/ActiveLesson';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherClassLayout({ children }) {
    const dispatch = useDispatch();
    const [showNav, setShowNav] = useState(true);

    return (
        <div className={cx('wrap')}>
            <HeaderCourse />
            <div className={cx('body')}>
                <TeacherNavbar showNav={showNav} setShowNav={setShowNav} />
                <div className={cx('content', { full: !showNav })}>{children}</div>
            </div>
            <TeacherFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default TeacherClassLayout;
