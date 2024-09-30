import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    faBook,
    faBookOpen,
    faCamera,
    faChevronDown,
    faCircleCheck,
    faCircleXmark,
    faFileLines,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { faLeanpub } from '@fortawesome/free-brands-svg-icons';
import { memo, useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { Select } from 'antd';

const cx = classNames.bind(styles);

function CreateLessonForm({ showCreateLesson, setShowCreateLesson, course_id }) {
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState('');
    const [typeValue, setTypeValue] = useState(0);
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
        {
            value: 3,
            lesson: 'Exam',
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faBookOpen} /> Exam
                </span>
            ),
        },
    ];

    const handleSubmit = () => {
        if (titleValue) {
            const values = {
                id: uuidv4(),
                course_id: course_id,
                type: typeValue,
                name: titleValue,
            };
            setTitleValue('');
            setTypeValue(0);
            dispatch(teacher.actions.setLesson(values));
            setShowCreateLesson(false);
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
                    1.1
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
                <FontAwesomeIcon
                    icon={titleValue ? faCircleCheck : faCircleXmark}
                    style={{ color: titleValue ? 'green' : 'red' }}
                />
            </span>
        </div>
    );
}

export default memo(CreateLessonForm);
