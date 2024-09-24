import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import './DesignPost.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '~/requestApi/requestBlog';
import { useNavigate } from 'react-router-dom';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

const editorConfig = {
    uploader: {
        insertImageAsBase64URI: true,
    },
    toolbar: true,
    askBeforePasteHTML: false,
    height: 450,
};
function NewPost() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const editor = useRef(null);

    const handleExport = async () => {
        setLoading(true);
        const values = {
            user_id: user.id,
            title: titleValue,
            content: editorContent,
        };
        try {
            const res = await createBlog(values);

            dispatch(ownData.actions.setBlogs(res.data));
            setLoading(false);
            navigate('/me/post');
        } catch (error) {
            console.log(error);
            setLoading(false);
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
