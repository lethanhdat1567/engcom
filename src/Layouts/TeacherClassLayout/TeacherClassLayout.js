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

const cx = classNames.bind(styles);

function TeacherClassLayout({ children }) {
    const carts = useSelector((state) => state.teacher.carts);
    const courses = useSelector((state) => state.teacher.courses);
    const dispatch = useDispatch();
    const [showNav, setShowNav] = useState(true);
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        setIsMount(true);

        return () => {
            if ((isMount && Object.keys(carts).length > 0) || courses.length > 0) {
                dispatch(teacher.actions.resetState());
                dispatch(activeLesson.actions.deleteActiveLesson());
            }
        };
    }, [carts]);

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
