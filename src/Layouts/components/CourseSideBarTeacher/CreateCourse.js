import classNames from 'classnames/bind';
import styles from './CourseSidebarTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useId, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { useParams } from 'react-router-dom';
import { insertCourseUpdate, updateCourseUpdate } from '~/requestApi/requestUpdateClass';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function CreateCourse({ setShowCreate, data }) {
    const slug = useParams();
    const dispatch = useDispatch();
    const courseId = useId();
    const [courseValue, setCourseValue] = useState(data?.name || '');
    const [createCourseLoading, setCreateCourseLoading] = useState(false);

    const handleSave = () => {
        // Update class
        if (Object.keys(slug).length > 0) {
            if (data) {
                if (Number(data.id)) {
                    setCreateCourseLoading(true);
                    const values = {
                        class_id: data.class_id,
                        name: courseValue,
                    };
                    updateCourseUpdate(data.id, values)
                        .then((res) => {
                            dispatch(teacher.actions.updateCourse(res.data));
                            setShowCreate(false);
                            setCreateCourseLoading(false);
                        })
                        .catch((error) => {
                            toastify('Create course false', 'error', 2000, 'top-right');
                            setCreateCourseLoading(false);
                        });
                } else {
                    const values = {
                        id: data.id,
                        name: courseValue,
                    };
                    dispatch(teacher.actions.updateCourse(values));
                    setShowCreate(false);
                }
            }
            // Create
            else {
                setCreateCourseLoading(true);
                const values = {
                    class_id: slug.slug,
                    name: courseValue,
                };
                insertCourseUpdate(values)
                    .then((res) => {
                        setCreateCourseLoading(false);
                        dispatch(teacher.actions.setCourse(res.data));
                        setShowCreate(false);
                    })
                    .catch((error) => {
                        setCreateCourseLoading(false);
                        console.log(error);
                    });
            }
        }
        // Create class
        else {
            // Update
            if (data) {
                const values = {
                    id: data.id,
                    name: courseValue,
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
                {courseValue &&
                    (createCourseLoading ? (
                        <span className={cx('course-icon')}>
                            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                        </span>
                    ) : (
                        <Tippy content="Create course">
                            <span className={cx('course-icon')} onClick={handleSave}>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: 'green' }} />
                            </span>
                        </Tippy>
                    ))}
            </div>
        </div>
    );
}

export default CreateCourse;
