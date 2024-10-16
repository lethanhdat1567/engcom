import classNames from 'classnames/bind';
import styles from './TeacherClassCourse.module.scss';
import CourseItem from '~/components/CourseItem/CourseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UpdateLoading from '~/components/Loading/UpdateLoading/UpdateLoading';

const cx = classNames.bind(styles);

function TeacherClassCourse() {
    const { slug } = useParams();
    const courses = useSelector((state) => state.teacher.courses);

    const [loading, setLoading] = useState(false);

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
