import classNames from 'classnames/bind';
import styles from './Lesson.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faBookOpen,
    faCamera,
    faChevronDown,
    faCircleCheck,
    faFileLines,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css';
import { faLeanpub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Select } from 'antd';

const cx = classNames.bind(styles);

function CreateLesson() {
    const [showCreateLesson, setShowCreateLesson] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [typeValue, setTypeValue] = useState(0);
    const lessonType = [
        {
            value: '0',
            lesson: 'Video',
            icon: <FontAwesomeIcon icon={faPlay} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faPlay} /> Video
                </span>
            ),
        },
        {
            value: '1',
            lesson: 'Text',
            icon: <FontAwesomeIcon icon={faFileLines} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faFileLines} /> Text
                </span>
            ),
        },
        {
            value: '2',
            lesson: 'Exercise',
            icon: <FontAwesomeIcon icon={faLeanpub} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faLeanpub} /> Exercise
                </span>
            ),
        },
        {
            value: '3',
            lesson: 'Exam',
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            label: (
                <span className={cx('type-wrap')}>
                    <FontAwesomeIcon icon={faBookOpen} /> Exam
                </span>
            ),
        },
    ];

    return (
        <>
            {/* Ui create course */}
            <div className={cx('create-lesson')} onClick={() => setShowCreateLesson(true)}>
                <span className={cx('create-icon')}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </span>
                <span className={cx('create-desc')}>Create your lesson</span>
            </div>
            {/* Create course */}
            <div className={cx('wrap', { show: showCreateLesson })}>
                <span className={cx('decor')}>{lessonType[typeValue]?.icon}</span>
                <div className={cx('main')}>
                    <div className={cx('title')}>
                        1.1
                        <input
                            className={cx('lesson-input')}
                            onChange={(e) => setTitleValue(e.target.value)}
                            placeholder="Lesson title..."
                        />
                    </div>
                    <div className={cx('sub-title')}>
                        <span className={cx('sub-desc')}>{lessonType[typeValue]?.lesson}</span>
                        <Select
                            onChange={(value) => setTypeValue(value)}
                            defaultValue={lessonType[0].value}
                            style={{
                                width: 120,
                            }}
                            options={lessonType}
                            placeholder="select it"
                        />
                    </div>
                </div>
                <span className={cx('course-icon')} onClick={() => setShowCreateLesson(false)}>
                    <FontAwesomeIcon
                        icon={titleValue ? faCircleCheck : faCircleXmark}
                        style={{ color: titleValue ? 'green' : 'red' }}
                    />
                </span>
            </div>
        </>
    );
}

export default CreateLesson;
