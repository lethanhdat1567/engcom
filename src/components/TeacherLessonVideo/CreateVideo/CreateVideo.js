import classNames from 'classnames/bind';
import styles from './CreateVideo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { requestDeleteVideo, requestUploadVideo } from '~/requestApi/requestUpload';
import Loading from '~/components/Loading/Loading';
import VideoLoading from '~/components/Loading/VideoLoading/VideoLoading';
import { Button, Flex } from 'antd';

const cx = classNames.bind(styles);

function CreateVideo({ utils }) {
    const { videoValue } = utils;
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef();

    const handleUpload = () => {
        uploadRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const reqValue = {
                file,
            };
            requestUploadVideo(reqValue)
                .then((res) => {
                    setLoading(false);
                    utils.setVideoValue(res.data.url);
                })
                .catch((error) => {
                    console.log(error);
                    utils.setVideoValue(null);
                    setLoading(false);
                });
        }
    };
    const handleDeleteVideo = () => {
        const reqValue = { url: videoValue };
        requestDeleteVideo(reqValue)
            .then((res) => {
                utils.setVideoValue('');
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('wrap')}>
            {videoValue ? (
                <>
                    <div className={cx('bg-video')}>
                        <div className={cx('video-wrap')}>
                            <div className={cx('banner')}>
                                <video className={cx('video')} controls>
                                    <source
                                        src={`${process.env.REACT_APP_BACKEND_UPLOAD}/videos/${utils.videoValue}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    <Flex justify="end" style={{ margin: '10px 0px' }}>
                        <Button type="primary" danger onClick={handleDeleteVideo}>
                            Delete Image
                        </Button>
                    </Flex>
                </>
            ) : (
                <div>
                    {loading ? (
                        <div className={cx('create')}>
                            <VideoLoading />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateVideo;
