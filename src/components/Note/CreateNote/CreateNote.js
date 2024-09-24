import classNames from 'classnames/bind';
import styles from './CreateNote.module.scss';
import './Design.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import HeaderSingle from '~/Layouts/components/HeaderSingle/HeaderSingle';
import { useSelector } from 'react-redux';
import { createNote } from '~/requestApi/requestNote';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);
const editorConfig = {
    uploader: {
        insertImageAsBase64URI: true,
    },
    askBeforePasteHTML: false,
    width: 600,
    height: 300,
};

function CreateNote({ utils }) {
    const { showCreateNote, setShowCreateNote, setNoteItems, noteItems } = utils;
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [titleValue, setTitleValue] = useState('');

    const handleSave = async () => {
        setLoading(true);
        const values = {
            user_id: user.id,
            title: titleValue,
            content: content,
        };
        try {
            const response = await createNote(values);
            setNoteItems([...noteItems, response.data.notebook]);
            setLoading(false);
            setShowCreateNote(false);
            setContent('');
            setTitleValue('');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <>
            <div className={cx('wrap', { show: showCreateNote })}>
                {loading && <Loading />}
                <div className={cx('content')}>
                    <div className={cx('header-wrap')}>
                        <h4 className={cx('title')}>Create Note</h4>
                        <span className={cx('x-mark')} onClick={() => setShowCreateNote(false)}>
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
            <div
                className={cx('over-lay', { show: showCreateNote })}
                onClick={() => setShowCreateNote(false)}
            ></div>
        </>
    );
}

export default CreateNote;
