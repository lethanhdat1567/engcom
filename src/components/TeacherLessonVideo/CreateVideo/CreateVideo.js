import classNames from 'classnames/bind';
import styles from './CreateVideo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function CreateVideo() {
    const uploadRef = useRef();

    const handleUpload = () => {
        uploadRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('create')} onClick={handleUpload}>
                <span className={cx('create-icon')}>
                    <FontAwesomeIcon icon={faVideo} />
                </span>
                <span className={cx('create-title')}>Insert your video</span>
            </div>
            <input
                type="file"
                ref={uploadRef}
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
}

export default CreateVideo;
