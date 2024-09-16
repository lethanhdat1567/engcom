import classNames from 'classnames/bind';
import styles from './CreateNote.module.scss';
import './Design.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CreateNote({ showCreateNote, setShowCreateNote }) {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    return (
        <>
            <div className={cx('wrap', { show: showCreateNote })}>
                <div className={cx('content')}>
                    <div className={cx('header-wrap')}>
                        <h4 className={cx('title')}>Create Note</h4>
                        <span className={cx('x-mark')} onClick={() => setShowCreateNote(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </div>
                    <input placeholder="Your title" className={cx('input-title')} />
                    <JoditEditor
                        className="note-design"
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>
            </div>
            <div
                className={cx('over-lay', { show: showCreateNote })}
                onClick={() => setShowCreateNote(false)}
            ></div>
        </>
    );
}

export default CreateNote;
