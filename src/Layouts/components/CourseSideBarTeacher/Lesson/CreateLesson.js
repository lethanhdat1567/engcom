import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useId, useState } from 'react';
import { faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import CreateLessonForm from './CreateLessonForm';

const cx = classNames.bind(styles);

function CreateLesson({ course_id }) {
    const [showCreateLesson, setShowCreateLesson] = useState(false);

    return (
        <>
            {/* Ui create course */}
            <div className={cx('create-wrap')}>
                {/* Create lesson */}
                <div className={cx('create-lesson')} onClick={() => setShowCreateLesson(true)}>
                    <span className={cx('create-icon')}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </span>
                    <span className={cx('create-desc')}>Create your lesson</span>
                </div>
            </div>
            {/* Create course */}
            <CreateLessonForm
                setShowCreateLesson={setShowCreateLesson}
                showCreateLesson={showCreateLesson}
                course_id={course_id}
            />
        </>
    );
}

export default CreateLesson;
