import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import './DesignPost.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { createBlog } from '~/requestApi/requestBlog';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading/Loading';
import UploadBanner from './UploadBanner';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

const editorConfig = {
    toolbar: true,
    askBeforePasteHTML: false,
    height: 450,
};
function NewPost() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [thumbnailValue, setThumnailValue] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const editor = useRef(null);

    const handleExport = async () => {
        setLoading(true);
        const values = {
            user_id: user.id,
            title: titleValue,
            thumbnail: thumbnailValue,
            content: `${editorContent}`,
        };
        try {
            const res = await createBlog(values);
            setLoading(false);
            navigate('/me/post');
            toastify('Create blog success', 'success', 2000, 'top-right');
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };
    return (
        <div className={cx('wrap')}>
            {loading && <Loading />}
            <div className={cx('input-wrap')}>
                <input
                    className={cx('input')}
                    placeholder="Title"
                    onChange={(e) => setTitleValue(e.target.value)}
                    value={titleValue}
                />
                <Button primary classNames={cx('btn-export')} onClick={handleExport}>
                    Export
                </Button>
            </div>
            <UploadBanner setThumnailValue={setThumnailValue} thumbnailValue={thumbnailValue} />
            <div className={cx('content')}>
                <div className={cx('design')}>
                    <JoditEditor
                        className="post-design"
                        ref={editor}
                        value={editorContent}
                        onChange={(newContent) => setEditorContent(newContent)}
                        config={editorConfig}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewPost;
