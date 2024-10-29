import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import request from '~/utils/request';
import { useState } from 'react';
import { Button, Flex } from 'antd';
import { requestDeleteUpload } from '~/requestApi/requestUpload';
import VideoLoading from '~/components/Loading/VideoLoading/VideoLoading';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function UploadBanner({ setThumnailValue, thumbnailValue }) {
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        request
            .post(`engcom/upload-cart`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setThumnailValue(res.data.url);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toastify('The image size is too large.', 'error', 2000, 'top-right');
                setLoading(false);
            });
    };

    const handleDelete = () => {
        if (thumbnailValue) {
            requestDeleteUpload(thumbnailValue)
                .then((res) => {
                    setThumnailValue('');
                })
                .catch((error) => console.log(error));
        }
    };

    return thumbnailValue ? (
        <div className={cx('banner-wrap')}>
            <img className={cx('banner')} src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${thumbnailValue}`} />
            <Flex justify="end">
                <Button type="primary" danger style={{ margin: '10px 0px' }} onClick={handleDelete}>
                    Delete banner
                </Button>
            </Flex>
        </div>
    ) : (
        <label htmlFor="upload" className={cx('upload-wrap')}>
            {loading ? (
                <VideoLoading />
            ) : (
                <div className={cx('upload-none')}>
                    <span className={cx('upload-icon', 'fa-xl')}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </span>
                    <span className={cx('upload-title')}>Upload your blog banner</span>
                </div>
            )}
            <input
                id="upload"
                type="file"
                style={{ width: '100%', height: '100%' }}
                hidden
                onChange={(e) => handleChange(e)}
            />
        </label>
    );
}

export default UploadBanner;
