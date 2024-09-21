import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import './DesignPost.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Button from '~/components/Button';

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
    const [titleValue, setTitleValue] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const editor = useRef(null);

    const handleExport = () => {
        const values = {
            title: titleValue,
            content: editorContent,
        };

        console.log(values);
    };
    return (
        <div className={cx('wrap')}>
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
