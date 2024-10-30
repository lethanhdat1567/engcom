import classNames from 'classnames/bind';
import styles from './CourseTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faSpinner,
    faSquarePlus,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CreateLesson from '../Lesson/CreateLesson';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import CreateCourse from '../CreateCourse';
import LessonTeacher from '../../CourseSidebar/LessonTeacher/LessonTeacher';
import { Button, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { deleteCourseUpdate } from '~/requestApi/requestUpdateClass';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function CourseTeacher({ data, course_index }) {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const lessons = useSelector((state) => state.teacher.lessons);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [showLesson, setShowLesson] = useState(false);
    const [showUpdateCourse, setShowUpdateCourse] = useState(false);
    const [moreEdit, setMoreEdit] = useState(false);
    const [deleteCourseLoading, setDeleteCourseLoading] = useState(false);

    const lessonData = lessons.filter((item, course_index) => item.course_id === data.id);

    const handleDeleteCourse = () => {
        if (slug && Object.keys(slug)?.length > 0) {
            if (Number(data.id)) {
                setDeleteCourseLoading(true);
                if (!deleteCourseLoading) {
                    deleteCourseUpdate(data.id)
                        .then((res) => {
                            dispatch(teacher.actions.deleteCourse(data.id));
                            setShowAlertModal(false);
                            setDeleteCourseLoading(false);
                        })
                        .catch((error) => {
                            console.log(error);

                            toastify('Delete course faild', 'error', 2000, 'top-right');
                            setDeleteCourseLoading(false);
                        });
                }
            } else {
                dispatch(teacher.actions.deleteCourse(data.id));
                showAlertModal(false);
            }
        } else {
            dispatch(teacher.actions.deleteCourse(data.id));
            setShowAlertModal(false);
        }
    };
    return (
        <>
            <div className={cx('course-wrap', { show: showLesson })} key={course_index}>
                <div className={cx('course')} onClick={() => setShowLesson(!showLesson)}>
                    <div className={cx('course-header')}>
                        <h4 className={cx('title')}>
                            {course_index + 1}. {data.name}
                        </h4>
                        <span className={cx('quantity')}>{lessonData.length} lesson available</span>
                    </div>
                    <span className={cx('course-icon', { active: showLesson })}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>
                <div className={cx('lesson-body', { show: showLesson })}>
                    <div className={cx('utils-wrap')}>
                        <div className={cx('more')} onClick={() => setMoreEdit(!moreEdit)}>
                            <FontAwesomeIcon icon={moreEdit ? faChevronUp : faChevronDown} />
                        </div>
                        <div className={cx('util', { more: moreEdit })}>
                            {/* Update */}
                            <div
                                className={cx('create-lesson-update')}
                                onClick={() => setShowUpdateCourse(!showUpdateCourse)}
                                style={{ background: showUpdateCourse ? '#3b3939' : 'blue' }}
                            >
                                <span className={cx('create-icon')}>
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </span>
                                <span className={cx('create-desc')}>
                                    {showUpdateCourse ? 'Cancel' : 'Update'} course
                                </span>
                            </div>
                            {/* Delete */}
                            <div
                                className={cx('create-lesson-delete')}
                                onClick={() => setShowAlertModal(true)}
                            >
                                <span className={cx('create-icon')}>
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </span>
                                <span className={cx('create-desc')}>Delete course</span>
                            </div>
                        </div>
                    </div>
                    {showUpdateCourse && <CreateCourse setShowCreate={setShowUpdateCourse} data={data} />}
                    <CreateLesson course_id={data.id} />
                    {lessonData.map((item, index) => {
                        return (
                            <LessonTeacher
                                key={index}
                                data={item}
                                index={index}
                                course_index={course_index}
                            />
                        );
                    })}
                </div>
            </div>
            <Modal
                title={<div className={cx('custom-modal-title')}>Warning</div>}
                open={showAlertModal}
                onCancel={() => setShowAlertModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowAlertModal(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleDeleteCourse}>
                        {deleteCourseLoading ? (
                            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                        ) : (
                            'Delete'
                        )}
                    </Button>,
                ]}
            >
                <div className={cx('alert-wrap')}>
                    <span className={cx('alert-icon')}>
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            style={{ color: 'red' }}
                            className="fa-xl"
                        />
                    </span>
                    <span className={cx('alert-desc')}>Your data will be lost!</span>
                </div>
            </Modal>
        </>
    );
}

export default CourseTeacher;
