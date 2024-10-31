import classNames from 'classnames/bind';
import styles from './CourseStudent.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCourseStudent from '../components/HeaderCourseStudent/HeaderCourseStudent';
import CourseSidebar from '../components/CourseSidebar/CourseSidebar';
import { useParams } from 'react-router-dom';
import { getCourseStudent } from '~/requestApi/requestStudent';
import Skeleton from 'react-loading-skeleton';
import { ScaleLoader } from 'react-spinners';
import { course } from '~/redux/reducer/Course';
import Content from './Content/Content';
import CourseFooter from '../components/CourseFooter/CourseFooter';
import { insertProgress } from '~/requestApi/requestCourse';
import useCourseUtils from '~/utils/useCourseUtils';
const cx = classNames.bind(styles);

function CourseStudent() {
    const { slug } = useParams();
    const { filterFirst } = useCourseUtils();

    // Redux
    const courseData = useSelector((state) => state.course.course);
    const progressData = useSelector((state) => state.course.progress);
    const user = useSelector((state) => state.user.user);
    const selectedLesson = useSelector((state) => state.course.selectedLesson);
    const dispatch = useDispatch();
    // hooks
    const [loading, setLoading] = useState(false);
    const [showNav, setShowNav] = useState(true);
    // handle function

    // Effect
    useEffect(() => {
        setLoading(true);
        getCourseStudent(slug, user.id)
            .then((res) => {
                filterFirst(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (user && progressData.length > 0 && user.role_id !== 4) {
            insertProgress(user.id, progressData)
                .then((res) => {
                    dispatch(course.actions.resetProgress());
                })
                .catch((error) => {
                    console.log('Error saving progress:', error);
                });
        }
    }, [user, progressData]);

    return (
        <div className={cx('wrap')}>
            {/* HEADER */}
            <HeaderCourseStudent />
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>
                    {/* CONTENT */}
                    {loading ? (
                        <Skeleton count={15} style={{ margin: '10px 0px' }} />
                    ) : (
                        <Content lessonContent={selectedLesson} />
                    )}
                </div>
                {/* SIDEBAR */}
                {loading ? (
                    <div className={cx('nav-loading')}>
                        <ScaleLoader color="#ccc" />
                    </div>
                ) : (
                    <CourseSidebar courseData={courseData} showNav={showNav} />
                )}
            </div>
            {/* FOOTER */}
            <CourseFooter showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseStudent;
