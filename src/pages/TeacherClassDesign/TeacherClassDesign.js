import classNames from 'classnames/bind';
import styles from './TeacherClassDesign.module.scss';
import './DesignClass.scss';
import JoditEditor from 'jodit-react';

const cx = classNames.bind(styles);

const editorConfig = {
    uploader: {
        insertImageAsBase64URI: true,
    },
    width: '100%',
    height: 600,
};
function TeacherClassDesign({ states }) {
    const { descValue, setDescValue } = states;

    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Your Description</h1>
            </div>
            <JoditEditor
                className="teacher-class-design"
                config={editorConfig}
                value={descValue}
                onBlur={(value) => setDescValue(value)}
            />
        </div>
    );
}

export default TeacherClassDesign;
