import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { Avatar, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faImage } from '@fortawesome/free-regular-svg-icons';
import ImageItem from '../ImageItem/ImageItem';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useSelector } from 'react-redux';
import { createPost } from '~/requestApi/requestPost';
import request from '~/utils/request';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function CreatePost() {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [imageValues, setImageValues] = useState();
    const [imageUrls, setImageUrls] = useState([]);
    const [contentValue, setContentValue] = useState('');
    const user = useSelector((state) => state.user.user);

    const handleCancle = () => {
        setShowCreatePost(false);
    };
    const handleSubmit = () => {
        if (contentValue.trim() || imageValues.length > 0) {
            const values = {
                user_id: user.id,
                content: contentValue,
                thumbnails: imageValues,
            };
            request
                .post(`engcom/fakeThreads`, values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    setContentValue('');
                    setImageUrls([]);
                    setImageValues([]);
                    setShowCreatePost(false);
                })
                .catch((error) => {
                    setContentValue('');
                    setImageUrls([]);
                    setImageValues([]);
                    setShowCreatePost(false);
                });
        }
    };

    const handleUpdateImg = (e) => {
        const imageFiles = Array.from(e.target.files);
        if (imageFiles.length > 0) {
            setImageValues(e.target.files);
            const newVideosUrl = imageFiles.map((item) => URL.createObjectURL(item));
            setImageUrls((prev) => [...prev, ...newVideosUrl]);
        }
    };

    return (
        <>
            <div className={cx('wrap')} onClick={() => setShowCreatePost(true)}>
                <Avatar size="medium" src={handleAvatar(user.avatar)} />
                <div className={cx('decor')}>Create a post...</div>
            </div>
            <Modal
                maskClosable={false}
                open={showCreatePost}
                onCancel={handleCancle}
                footer={[
                    <Button danger key="cancel" onClick={handleCancle}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit}
                        disabled={!contentValue.trim()}
                    >
                        Post
                    </Button>,
                ]}
            >
                <div className={cx('modal')}>
                    <Avatar size="medium" style={{ flexShrink: 0 }} src={handleAvatar(user.avatar)} />
                    <div className={cx('modal-body')}>
                        <span className={cx('modal-name')}>Le Thanh Dat</span>
                        <TextareaAutosize
                            placeholder="Type something..."
                            rows={1}
                            style={{
                                border: 'none',
                                resize: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                            value={contentValue}
                            onChange={(e) => setContentValue(e.target.value)}
                        />
                        {imageUrls.length > 0 && (
                            <div className={cx('slider-wrap')}>
                                <Swiper
                                    grabCursor={imageUrls.length > 1}
                                    className="slider-post"
                                    spaceBetween={20}
                                    slidesPerView={imageUrls.length === 1 ? 1 : 'auto'}
                                >
                                    {imageUrls.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <ImageItem
                                                    index={index}
                                                    setImageUrls={setImageUrls}
                                                    setImageValues={setImageValues}
                                                    src={item}
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        )}

                        <div className={cx('utils')}>
                            <label className={cx('icon')} htmlFor="post-upload">
                                <FontAwesomeIcon icon={faImage} className="fa-lg" />
                                <input
                                    onChange={(e) => handleUpdateImg(e)}
                                    id="post-upload"
                                    type="file"
                                    hidden
                                    className={cx('hidden-file')}
                                    accept="image/*"
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CreatePost;
