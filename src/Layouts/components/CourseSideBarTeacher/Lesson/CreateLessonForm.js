import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    faCircleCheck,
    faCircleXmark,
    faFileLines,
    faPlay,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { faLeanpub } from '@fortawesome/free-brands-svg-icons';
import { memo, useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { Select } from 'antd';
import { insertLessonUpdate } from '~/requestApi/requestUpdateClass';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function CreateLessonForm({ showCreateLesson, setShowCreateLesson, course_id }) {
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState('');
    const [typeValue, setTypeValue] = useState(0);
    const [createLessonLoading, setCreateLessonLoading] = useState(false);
    const lessonType = [
        {
            value: 0,
            lesson: 'Video',
            icon: <FontAwesomeIcon icon={faPlay} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faPlay} /> Video
                </span>
            ),
        },
        {
            value: 1,
            lesson: 'Text',
            icon: <FontAwesomeIcon icon={faFileLines} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faFileLines} /> Text
                </span>
            ),
        },
        {
            value: 2,
            lesson: 'Exercise',
            icon: <FontAwesomeIcon icon={faLeanpub} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faLeanpub} /> Exercise
                </span>
            ),
        },
    ];

    const handleSubmit = () => {
        if (titleValue) {
            if (Number(course_id)) {
                setCreateLessonLoading(true);
                const values = {
                    name: titleValue,
                    type: typeValue,
                    course_id: course_id,
                };
                insertLessonUpdate(values)
                    .then((res) => {
                        setCreateLessonLoading(false);
                        dispatch(teacher.actions.setLesson(res.data));
                        setShowCreateLesson(false);
                        setTitleValue('');
                        setTypeValue(0);
                    })
                    .catch((error) => {
                        setCreateLessonLoading(false);
                        toastify('Create lesson faild', 'error', 2000, 'top-right');
                    });
            } else {
                const values = {
                    id: uuidv4(),
                    course_id: course_id,
                    type: `${typeValue}`,
                    name: titleValue,
                };
                setTitleValue('');
                setTypeValue(0);
                dispatch(teacher.actions.setLesson(values));
                setShowCreateLesson(false);
            }
        } else {
            setShowCreateLesson(false);
            setTitleValue('');
        }
    };
    return (
        <div className={cx('wrap', { show: showCreateLesson })}>
            <span className={cx('decor')}>{lessonType[typeValue]?.icon}</span>
            <div className={cx('main')}>
                <div className={cx('title')}>
                    <input
                        className={cx('lesson-input')}
                        onChange={(e) => setTitleValue(e.target.value)}
                        placeholder="Lesson title..."
                        value={titleValue}
                    />
                </div>
                <div className={cx('sub-title')}>
                    <span className={cx('sub-desc')}>{lessonType[typeValue]?.lesson}</span>
                    <Select
                        onChange={(value) => setTypeValue(value)}
                        value={lessonType[typeValue].value}
                        style={{
                            width: 120,
                        }}
                        options={lessonType}
                        placeholder="select it"
                    />
                </div>
            </div>
            <span className={cx('course-icon')} onClick={handleSubmit}>
                {createLessonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                ) : (
                    <FontAwesomeIcon
                        icon={titleValue ? faCircleCheck : faCircleXmark}
                        style={{ color: titleValue ? 'green' : 'red' }}
                    />
                )}
            </span>
        </div>
    );
}

export default memo(CreateLessonForm);
