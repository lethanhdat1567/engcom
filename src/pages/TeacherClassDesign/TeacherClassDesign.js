import classNames from 'classnames/bind';
import styles from './TeacherClassDesign.module.scss';
import './DesignClass.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function TeacherClassDesign() {
    const editor = useRef(null);
    const handleChange = (newContent) => {
        editor.current = newContent;
    };
    const editorConfig = {
        readonly: false,
        toolbar: true,
        spellcheck: true,
        toolbarButtonSize: 'medium',
        toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        width: '100%',
        height: 400,
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Your Design</h1>
                <button className={cx('btn-wrap')}>Export</button>
            </div>
            <JoditEditor
                className="teacher-class-design"
                config={editorConfig}
                ref={editor}
                onChange={handleChange}
            />
        </div>
    );
}

export default TeacherClassDesign;
