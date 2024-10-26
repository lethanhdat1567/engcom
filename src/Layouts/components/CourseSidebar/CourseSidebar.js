import classNames from 'classnames/bind';
import styles from './CourseSidebar.module.scss';
import CourseItem from './CourseItem/CourseItem';

const cx = classNames.bind(styles);

function CourseSidebar({ showNav, courseData }) {
    return (
        <div className={cx('navbar', { show: showNav })}>
            <div className={cx('heading')}>Unit process</div>
            <div className={cx('body')}>
                {courseData.map((item, index) => {
                    return <CourseItem data={item} key={index} course_index={index} />;
                })}
            </div>
        </div>
    );
}

export default CourseSidebar;
