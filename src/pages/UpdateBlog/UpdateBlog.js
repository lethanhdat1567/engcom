import classNames from 'classnames/bind';
import styles from './UpdateBlog.module.scss';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, readBlog, updateBlog } from '~/requestApi/requestBlog';
import { useNavigate, useParams } from 'react-router-dom';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import Loading from '~/components/Loading/Loading';
import { storeData } from '~/redux/reducer/StoreSlice';
import UploadBanner from '../NewPost/UploadBanner';

const cx = classNames.bind(styles);

const editorConfig = {
    toolbar: true,
    askBeforePasteHTML: false,
    height: 450,
    placeholder: '',
};
function UpdateBLog() {
    const user = useSelector((state) => state.user.user);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [blogId, setBlogId] = useState();
    const [titleValue, setTitleValue] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [thumbnailValue, setThumbnalValue] = useState('');
    const editor = useRef(null);

    const handleExport = async () => {
        setLoading(true);
        const values = {
            title: titleValue,
            content: editorContent,
            thumbnail: thumbnailValue,
        };
        try {
            const res = await updateBlog(blogId, values);
            setLoading(false);
            navigate('/me/post');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        readBlog(slug)
            .then((res) => {
                setTitleValue(res.data.blog.title);
                setEditorContent(res.data.blog.content);
                setBlogId(res.data.blog.id);
                setThumbnalValue(res.data.blog.thumbnail);
                setLoading(false);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [slug]);
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
            <UploadBanner setThumnailValue={setThumbnalValue} thumbnailValue={thumbnailValue} />
            <div className={cx('content')}>
                <div className={cx('design')}>
                    <JoditEditor
                        className="post-design"
                        ref={editor}
                        value={editorContent}
                        onChange={(newContent) => {
                            setEditorContent(newContent);
                        }}
                        config={editorConfig}
                    />
                </div>
            </div>
        </div>
    );
}

export default UpdateBLog;
