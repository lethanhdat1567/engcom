import classNames from 'classnames/bind';
import styles from './TeacherClassCourse.module.scss';
import CourseItem from '~/components/CourseItem/CourseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherClassCourse() {
    return (
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
                    <CourseItem />
                </div>
            </div>
        </Link>
    );
}

export default TeacherClassCourse;
