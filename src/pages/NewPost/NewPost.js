import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import './DesignPost.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewPost() {
    const editor = useRef(null);
    const handleChange = (newContent) => {
        editor.current = newContent;
    };
    const config = {
        uploader: {
            url: '/api/upload',
            format: 'json',
            insertImageAsBase64URI: true,
        },
        readonly: false,
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('input-wrap')}>
                <input className={cx('input')} placeholder="Title" />
                <Button primary classNames={cx('btn-export')}>
                    Export
                </Button>
            </div>
            <div className={cx('content')}>
                <div className={cx('design')}>
                    <JoditEditor
                        className="post-design"
                        ref={editor}
                        config={config}
                        value={editor.current}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewPost;
