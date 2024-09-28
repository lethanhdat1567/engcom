import classNames from 'classnames/bind';
import styles from './TeacherClassCourse.module.scss';
import CourseItem from '~/components/CourseItem/CourseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TeacherClassCourse() {
    const { slug } = useParams();
    const courses = useSelector((state) => state.teacher.courses);
    return slug ? (
        <Link to={`${process.env.REACT_APP_ROOT}/class/1/course/1`}>
            <div className={cx('wrap')}>
                <h1 className={cx('title')}>Your courses</h1>

                <div className={cx('body')}>
                    <div className={cx('btn-wrap')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </span>
                        <span className={cx('btn-text')}>Create course</span>
                    </div>
                    {courses.map((item, index) => {
                        return <CourseItem data={item} key={index} />;
                    })}
                </div>
            </div>
        </Link>
    ) : (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Your courses</h1>

            <Link to={`${process.env.REACT_APP_ROOT}/class/course`}>
                <div className={cx('body')}>
                    <div className={cx('btn-wrap')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span className={cx('btn-text')}>Edit course</span>
                    </div>
                    {courses.map((item, index) => {
                        return <CourseItem data={item} key={index} />;
                    })}
                </div>
            </Link>
        </div>
    );
}

export default TeacherClassCourse;
