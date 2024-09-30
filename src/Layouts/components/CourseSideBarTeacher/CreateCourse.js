import classNames from 'classnames/bind';
import styles from './CourseSidebarTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useId, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import CreateLesson from './Lesson/CreateLesson';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';

const cx = classNames.bind(styles);

function CreateCourse({ setShowCreate, data }) {
    const dispatch = useDispatch();
    const courseId = useId();
    const [courseValue, setCourseValue] = useState(data?.title || '');
    const handleSave = () => {
        // Update
        if (data) {
            const values = {
                id: data.id,
                title: courseValue,
            };
            dispatch(teacher.actions.updateCourse(values));
            setShowCreate(false);
        }
        // Create
        else {
            const values = {
                id: courseId,
                name: courseValue,
            };
            dispatch(teacher.actions.setCourse(values));
            setShowCreate(false);
        }
    };
    return (
        <div className={cx('course-wrap')}>
            <div className={cx('course')}>
                <div className={cx('course-header')}>
                    <div className={cx('title')}>
                        <input
                            className={cx('course-input')}
                            onChange={(e) => setCourseValue(e.target.value)}
                            placeholder="Your title..."
                            value={courseValue}
                        />
                    </div>
                    <span className={cx('quantity')}>-/- lesson</span>
                </div>
                {courseValue && (
                    <Tippy content="Create course">
                        <span className={cx('course-icon')} onClick={handleSave}>
                            <FontAwesomeIcon icon={faFloppyDisk} style={{ color: 'green' }} />
                        </span>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default CreateCourse;
