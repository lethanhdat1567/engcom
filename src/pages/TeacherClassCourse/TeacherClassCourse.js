import classNames from 'classnames/bind';
import styles from './TeacherClassCourse.module.scss';
import CourseItem from '~/components/CourseItem/CourseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getCourse } from '~/requestApi/requestCourse';
import { teacher } from '~/redux/reducer/TeacherSlice';
import UpdateLoading from '~/components/Loading/UpdateLoading/UpdateLoading';

const cx = classNames.bind(styles);

function TeacherClassCourse() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.teacher.courses);

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (slug) {
    //         setLoading(true);
    //         getCourse(slug)
    //             .then((res) => {
    //                 dispatch(teacher.actions.setUpdateCourse(res.data.courses));
    //                 dispatch(teacher.actions.setUpdateLesson(res.data.lessons));
    //                 dispatch(teacher.actions.setUpdateContent(res.data.content));
    //                 setLoading(false);
    //             })
    //             .catch((error) => console.log(error));
    //     }
    // }, []);

    return slug ? (
        <div className={cx('wrap')}>
            {loading ? (
                <UpdateLoading />
            ) : (
                <>
                    <h1 className={cx('title')}>Your courses</h1>
                    <div className={cx('body')}>
                        <Link to={`${process.env.REACT_APP_ROOT}/class/${slug}/course`}>
                            <div className={cx('btn-wrap')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </span>
                                <span className={cx('btn-text')}>Update course</span>
                            </div>
                        </Link>
                        {courses.map((item, index) => {
                            return <CourseItem data={item} key={index} />;
                        })}
                        {courses.length === 0 && (
                            <div className={cx('alert')}>You need to have as least 1 course!</div>
                        )}
                    </div>
                </>
            )}
        </div>
    ) : (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Your courses</h1>

            <div className={cx('body')}>
                <Link to={`${process.env.REACT_APP_ROOT}/class/course`}>
                    <div className={cx('btn-wrap')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span className={cx('btn-text')}>Create course</span>
                    </div>
                </Link>
                {courses.map((item, index) => {
                    return <CourseItem data={item} key={index} />;
                })}
                {courses.length === 0 && (
                    <div className={cx('alert')}>You need to have as least 1 course!</div>
                )}
            </div>
        </div>
    );
}

export default TeacherClassCourse;
