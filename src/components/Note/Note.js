import classNames from 'classnames/bind';
import styles from './Note.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import CreateNote from './CreateNote/CreateNote';
import NoteItem from '../NoteItem/NoteItem';
import { readNote } from '~/requestApi/requestNote';
import { useDispatch, useSelector } from 'react-redux';
import UpdateNote from './UpdateNote/UpdateNote';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import SkeletonLoading from '../Loading/SkeletonLoading';
import NoteModal from './NoteModal/NoteModal';

const cx = classNames.bind(styles);

function Note({ white = false }) {
    // redux
    const dispatch = useDispatch();
    const noteItems = useSelector((state) => state.ownData.notes);
    const user = useSelector((state) => state.user.user);

    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [showCreateNote, setShowCreateNote] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateValues, setUpdateValues] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [activeNote, setActiveNote] = useState({});

    // Midlewate
    const utilsNote = {
        showNote,
        setShowNote,
        showCreateNote,
        setShowCreateNote,
        UpdateNote,
        setShowUpdate,
        updateValues,
        setUpdateValues,
    };
    useEffect(() => {
        if (!noteItems) {
            setLoading(true);
            const handleRequest = async () => {
                const result = await readNote(user.id);

                dispatch(ownData.actions.getNotes(result.notebook));
                setLoading(false);
            };
            handleRequest();
        }
    }, [noteItems]);
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
                        {loading ? (
                            <SkeletonLoading dark count={5} height={70} margin={6} />
                        ) : (
                            noteItems?.map((item, index) => {
                                return (
                                    <NoteItem
                                        setActiveNote={setActiveNote}
                                        setShowModal={setShowModal}
                                        utils={utilsNote}
                                        data={item}
                                        key={index}
                                    />
                                );
                            })
                        )}
                    </div>
                    {createLoading && <SkeletonLoading dark count={1} height={70} margin={10} />}
                </div>
            </div>
            <CreateNote setCreateLoading={setCreateLoading} createLoading={createLoading} utils={utilsNote} />
            <div className={cx('over-lay', { show: showNote })} onClick={() => setShowNote(false)}></div>
            <UpdateNote
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                data={updateValues}
                utils={utilsNote}
            />
            <div className={cx('over-lay', { show: showUpdate })} onClick={() => setShowUpdate(false)}></div>
            <NoteModal showModal={showModal} setShowModal={setShowModal} activeNote={activeNote} />
        </>
    );
}

export default Note;
