import classNames from 'classnames/bind';
import styles from './CourseSidebarTeacher.module.scss';
import CreateCourse from './CreateCourse';
import { useState } from 'react';
import CourseTeacher from './CourseTeacher/CourseTeacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function CourseSidebarTeacher({ showNav, setShowNav }) {
    const courses = useSelector((state) => state.teacher.courses);
    const lessons = useSelector((state) => state.teacher.lessons);
    const navigate = useNavigate();
    const { slug } = useParams();
    const [showCreate, setShowCreate] = useState(false);

    const handleSave = () => {
        if (lessons.length !== 0) {
            if (slug) {
                navigate(`/own/${slug}`);
            } else {
                navigate('/create-class/courses');
            }
        }
    };

    return (
        <div className={cx('navbar', { show: showNav })}>
            <div className={cx('head-wrap')}>
                <h2 className={cx('title')}>Courses</h2>
                <span className={cx('x-mark')} onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                </span>
            </div>
            <div className={cx('create-course-wrap')} onClick={() => setShowCreate(!showCreate)}>
                <button className={cx('create-course')} style={{ background: showCreate ? 'red' : 'blue' }}>
                    {showCreate ? 'Delete' : 'Create'} Course
                </button>
            </div>
            {/* Create course */}
            {showCreate && <CreateCourse setShowCreate={setShowCreate} />}
            {/* Create lesson */}
            {courses.map((item, index) => {
                return <CourseTeacher key={index} course_index={index} data={item} />;
            })}
            <div className={cx('save-course-wrap', { block: lessons.length === 0 })} onClick={handleSave}>
                <button className={cx('save-course')} style={{ background: 'blue' }}>
                    {slug ? 'Back' : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default CourseSidebarTeacher;
