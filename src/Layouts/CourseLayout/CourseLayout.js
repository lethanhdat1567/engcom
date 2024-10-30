import classNames from 'classnames/bind';
import styles from './CourseLayout.module.scss';
import HeaderCourse from '../components/HeaderCourse/HeaderCourse';
import { useEffect, useState } from 'react';
import CourseSidebarTeacher from '../components/CourseSideBarTeacher/CourseSidebarTeacher';
import { useDispatch, useSelector } from 'react-redux';
import CourseFooterCreate from '../components/CourseFooterCreate/CourseFooter';
import { getCourse } from '~/requestApi/requestCourse';
import { useParams } from 'react-router-dom';
import { teacher } from '~/redux/reducer/TeacherSlice';
import UpdateLoading from '~/components/Loading/UpdateLoading/UpdateLoading';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
const cx = classNames.bind(styles);

function CourseLayout({ children }) {
    const [showNav, setShowNav] = useState(true);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const coursesData = useSelector((state) => state.teacher.courses);
    const { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(coursesData).length === 0 && slug) {
            setLoading(true);
            getCourse(slug)
                .then((res) => {
                    setLoading(false);
                    dispatch(teacher.actions.setUpdateCourse(res.data.courses));
                    dispatch(teacher.actions.setUpdateLesson(res.data.lessons));
                    dispatch(teacher.actions.setUpdateContent(res.data.content));
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div className={cx('wrap')}>
            {user.role_id == 3 && <HeaderCourse />}
            {user.role_id == 4 && <HeaderAdmin />}
            {loading ? (
                <UpdateLoading />
            ) : (
                <>
                    <div className={cx('body')}>
                        <div className={cx('content', { full: !showNav })}>{children}</div>
                        {(user.role_id == 3 || user.role_id == 4) && (
                            <CourseSidebarTeacher showNav={showNav} setShowNav={setShowNav} />
                        )}
                    </div>
                    <CourseFooterCreate showNav={showNav} setShowNav={setShowNav} />
                </>
            )}
        </div>
    );
}

export default CourseLayout;
