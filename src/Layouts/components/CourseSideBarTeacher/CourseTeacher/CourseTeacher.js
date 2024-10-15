import classNames from 'classnames/bind';
import styles from './CourseTeacher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faSquarePlus,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CreateLesson from '../Lesson/CreateLesson';
import Lesson from '../../CourseSidebar/Lesson/Lesson';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import CreateCourse from '../CreateCourse';
import LessonTeacher from '../../CourseSidebar/LessonTeacher/LessonTeacher';
import { activeLesson } from '~/redux/reducer/ActiveLesson';
import { Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { deleteCourseUpdate } from '~/requestApi/requestUpdateClass';

const cx = classNames.bind(styles);

function CourseTeacher({ data, index }) {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const lessons = useSelector((state) => state.teacher.lessons);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [showLesson, setShowLesson] = useState(false);
    const [showUpdateCourse, setShowUpdateCourse] = useState(false);
    const [moreEdit, setMoreEdit] = useState(false);

    const lessonData = lessons.filter((item, index) => item.course_id === data.id);

    const handleDeleteCourse = () => {
        if (Object.keys(slug).length > 0) {
            if (Number(data.id)) {
                deleteCourseUpdate(data.id)
                    .then((res) => {
                        dispatch(teacher.actions.deleteCourse(data.id));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                dispatch(teacher.actions.deleteCourse(data.id));
            }
        } else {
            dispatch(teacher.actions.deleteCourse(data.id));
        }
    };
    return (
        <>
            <div className={cx('course-wrap', { show: showLesson })} key={index}>
                <div className={cx('course')} onClick={() => setShowLesson(!showLesson)}>
                    <div className={cx('course-header')}>
                        <h4 className={cx('title')}>
                            {index + 1}. {data.name}
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
                                    {showUpdateCourse ? 'Cancle' : 'Update'} course
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
                        return <LessonTeacher key={index} data={item} index={index} />;
                    })}
                </div>
            </div>
            <Modal
                title={<div className={cx('custom-modal-title')}>Warning</div>}
                open={showAlertModal}
                onOk={handleDeleteCourse}
                onCancel={() => setShowAlertModal(false)}
            >
                <div className={cx('alert-wrap')}>
                    <span className={cx('alert-icon')}>
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            style={{ color: 'red' }}
                            className="fa-xl"
                        />
                    </span>
                    <span className={cx('alert-desc')}>Du lieu cua ban se mat het!</span>
                </div>
            </Modal>
        </>
    );
}

export default CourseTeacher;
