import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';

const cx = classNames.bind(styles);

function TeacherLessonText() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('create')}>
                <Button type="primary" className={cx('btn')}>
                    Export
                </Button>
                <JoditEditor config={{ height: 600 }} />
            </div>
            {/* <div className={cx('content')}>alo alo</div> */}
        </div>
    );
}

export default TeacherLessonText;
