import classNames from 'classnames/bind';
import styles from './LessonTeacher.module.scss';
import { checked } from '~/assets/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleXmark, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { validateIcon, validateText } from '~/utils/validateIcon';
import { activeLesson } from '~/redux/reducer/ActiveLesson';
import { requestDeleteVideo, requestUploadVideo } from '~/requestApi/requestUpload';
import { useParams } from 'react-router-dom';
import { deleteLesson } from '~/requestApi/requestLesson';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { toastify } from '~/utils/toast';
const cx = classNames.bind(styles);

function LessonTeacher({ data, index, course_index }) {
    const dispatch = useDispatch();
    const slug = useParams();
    const currentLesson = useSelector((state) => state.activeLesson.lesson);
    const contents = useSelector((state) => state.teacher.contents);
    const currentContent = contents.find((item) => item.lesson_id === data.id);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [deleteLessonLoading, setDeleteLessonLoading] = useState(false);

    const handleDelete = () => {
        if (Number(data.id)) {
            if (slug) {
                setDeleteLessonLoading(true);
                deleteLesson(data.id)
                    .then((res) => {
                        setDeleteLessonLoading(false);
                        if (currentContent) {
                            dispatch(teacher.actions.deleteContent(currentContent.id));
                        }
                        dispatch(teacher.actions.deleteLesson(data.id));
                        dispatch(activeLesson.actions.deleteActiveLesson());
                        setShowAlertModal(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        toastify('Delete lesson fail', 'error', 2000, 'top-right');
                        setDeleteLessonLoading(false);
                    });
            }
        } else {
            dispatch(teacher.actions.deleteLesson(data.id));
            dispatch(activeLesson.actions.deleteActiveLesson());
            setShowAlertModal(false);
        }
    };

    return (
        <>
            <div className={cx('wrap', { active: currentLesson.id === data.id })}>
                <span className={cx('decor')}>{<FontAwesomeIcon icon={validateIcon(data?.type)} />}</span>
                <div
                    className={cx('main')}
                    onClick={() => dispatch(activeLesson.actions.setActiveLesson(data))}
                >
                    <h5 className={cx('title')}>
                        {Number(course_index) + 1}.{index + 1} {data.name}
                    </h5>
                    <span className={cx('sub-title')}>{validateText(data.type)}</span>
                </div>
                <span className={cx('check')} onClick={() => setShowAlertModal(true)}>
                    <span className={cx('btn-delete')}>
                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }} />
                    </span>
                </span>
            </div>
            <Modal
                title={<div className={cx('custom-modal-title')}>Warning</div>}
                open={showAlertModal}
                onCancel={() => setShowAlertModal(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowAlertModal(false)}>
                        Cancle
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleDelete}>
                        {deleteLessonLoading ? (
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
                    <span className={cx('alert-desc')}>Your data will be lost!. </span>
                </div>
            </Modal>
        </>
    );
}

export default LessonTeacher;
