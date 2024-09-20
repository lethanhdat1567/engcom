import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';

const cx = classNames.bind(styles);

function TeacherLessonText() {
    return (
        <div className={cx('wrap')}>
            <Button type="primary" className={cx('btn')}>
                Export
            </Button>
            <JoditEditor config={{ height: 600 }} />
        </div>
    );
}

export default TeacherLessonText;
