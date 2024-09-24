import classNames from 'classnames/bind';
import styles from './UpdateNote.module.scss';
import './Design.scss';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '~/requestApi/requestNote';
import Loading from '~/components/Loading/Loading';
import { ownData } from '~/redux/reducer/OwnDataSlice';

const cx = classNames.bind(styles);
const editorConfig = {
    uploader: {
        insertImageAsBase64URI: true,
    },
    askBeforePasteHTML: false,
    placeholder: '',
    width: 600,
    height: 300,
};

function UpdateNote({ showUpdate, setShowUpdate, data, utils }) {
    // redux
    const dispatch = useDispatch();
    const noteItems = useSelector((state) => state.ownData.notes);

    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState(data.content || '');
    const [titleValue, setTitleValue] = useState(data.title || '');

    const handleSave = async () => {
        setLoading(true);
        const values = {
            user_id: user.id,
            title: titleValue,
            content: content,
        };
        try {
            const response = await updateNote(data.id, values);
            const updatedNotebook = response.notebook;
            dispatch(ownData.actions.updateNotes(updatedNotebook));

            setLoading(false);
            setShowUpdate(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (data) {
            setContent(data.content || '');
            setTitleValue(data.title || '');
        }
    }, [data]);
    return (
        <>
            <div className={cx('wrap', { show: showUpdate })}>
                {loading && <Loading />}
                <div className={cx('content')}>
                    <div className={cx('header-wrap')}>
                        <h4 className={cx('title')}>Update Note</h4>
                        <span className={cx('x-mark')} onClick={() => setShowUpdate(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </div>
                    <input
                        placeholder="Your title"
                        className={cx('input-title')}
                        onChange={(e) => setTitleValue(e.target.value)}
                        value={titleValue}
                    />
                    <JoditEditor
                        config={editorConfig}
                        className="note-design"
                        ref={editor}
                        value={content}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                    <Button save onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
            <div className={cx('over-lay', { show: showUpdate })} onClick={() => setShowUpdate(false)}></div>
        </>
    );
}

export default UpdateNote;
