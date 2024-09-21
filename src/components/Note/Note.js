import classNames from 'classnames/bind';
import styles from './Note.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import CreateNote from './CreateNote/CreateNote';
import NoteItem from '../NoteItem/NoteItem';

const cx = classNames.bind(styles);

function Note({ white = false }) {
    const [showNote, setShowNote] = useState(false);
    const [showCreateNote, setShowCreateNote] = useState(false);

    const noteItems = [
        {
            title: 'Day la note title',
            content: 'Day la note content',
        },
        {
            title: 'Day la note title',
            content: 'Hom nay la ngay 21/9/2024',
        },
    ];
    return (
        <>
            <div className={cx('note', { white })} onClick={() => setShowNote(true)}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faBook} className="fa-xl" />
                </span>
            </div>
            <div className={cx('note-content', { show: showNote })}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('header-wrap')}>
                            <h3 className={cx('note-title')}>My Notebook</h3>
                            <div className={cx('create-wrap')} onClick={() => setShowCreateNote(true)}>
                                <span className={cx('create-icon')}>
                                    <FontAwesomeIcon icon={faSquarePlus} className="fa-xl" />
                                </span>
                                <button className={cx('create-note')}>Create note</button>
                            </div>
                        </div>
                        <span className={cx('x-mark')}>
                            <FontAwesomeIcon
                                className={cx('xmark-icon')}
                                icon={faXmark}
                                onClick={() => setShowNote(false)}
                            />
                        </span>
                    </div>
                    {/* Note item */}
                    <div className={cx('note-body')}>
                        {noteItems.map((item, index) => {
                            return <NoteItem setShowCreateNote={setShowCreateNote} data={item} key={index} />;
                        })}
                    </div>
                </div>
            </div>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote} />
            <div className={cx('over-lay', { show: showNote })} onClick={() => setShowNote(false)}></div>
        </>
    );
}

export default Note;
