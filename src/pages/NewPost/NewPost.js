import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import './DesignPost.scss';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewPost() {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    return (
        <div className={cx('wrap')}>
            <div className={cx('input-wrap')}>
                <input className={cx('input')} placeholder="Title" />
                <Button primary classNames={cx('btn-export')}>
                    Export
                </Button>
            </div>
            <div className={cx('content')}>
                <div className="row g-0" style={{ height: '100%' }}>
                    <div className="col">
                        <div className={cx('design')}>
                            <JoditEditor
                                className="post-design"
                                ref={editor}
                                value={content}
                                onChange={(newContent) => setContent(newContent)}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <h3 className={cx('body-title')}>View</h3>
                        <div className={cx('output')} dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPost;
