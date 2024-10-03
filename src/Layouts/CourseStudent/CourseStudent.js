import classNames from 'classnames/bind';
import styles from './CourseStudent.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseFooterCreate from '../components/CourseFooterCreate/CourseFooter';
import HeaderCourseStudent from '../components/HeaderCourseStudent/HeaderCourseStudent';
import CourseSidebar from '../components/CourseSidebar/CourseSidebar';
import { useParams } from 'react-router-dom';
import { getCourseStudent } from '~/requestApi/requestStudent';
import Skeleton from 'react-loading-skeleton';
import { ScaleLoader } from 'react-spinners';
import { course } from '~/redux/reducer/Course';
const cx = classNames.bind(styles);

function CourseStudent({ children }) {
    const { slug } = useParams();
    // Redux
    const courseData = useSelector((state) => state.course.course);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    // hooks
    const [loading, setLoading] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [selectedLesson, setSelectedLesson] = useState();
    // handle function

    // Effect
    useEffect(() => {
        setLoading(true);
        getCourseStudent(slug, user.id)
            .then((res) => {
                const firstLesson = res.data[0].lessons[0];
                const setProgressValue = {
                    user_id: user.id,
                    course_id: res.data[0].id,
                    lessons_id: firstLesson.id,
                };
                dispatch(course.actions.setCourse(res.data));
                dispatch(course.actions.setProgressing(setProgressValue));
                dispatch(course.actions.setActiveLessonID(firstLesson.id));
                setSelectedLesson(firstLesson.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Handle active course
    return (
        <div className={cx('wrap')}>
            <HeaderCourseStudent />
            <div className={cx('body')}>
                <div className={cx('content', { full: !showNav })}>
                    {loading ? (
                        <Skeleton count={15} style={{ margin: '10px 0px' }} />
                    ) : (
                        <div>Lesson content</div>
                    )}
                </div>
                {loading ? (
                    <div className={cx('nav-loading')}>
                        <ScaleLoader color="#ccc" />
                    </div>
                ) : (
                    <CourseSidebar courseData={courseData} showNav={showNav} />
                )}
            </div>
            <CourseFooterCreate showNav={showNav} setShowNav={setShowNav} />
        </div>
    );
}

export default CourseStudent;
