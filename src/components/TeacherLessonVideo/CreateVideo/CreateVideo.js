import classNames from 'classnames/bind';
import styles from './CreateVideo.module.scss';
import { useEffect, useState } from 'react';
import { requestDeleteVideo, requestUploadVideo } from '~/requestApi/requestUpload';
import { Button, Col, Flex, Input, message, Row, Typography } from 'antd';
import { toastify } from '~/utils/toast';
import useDebounce from '~/hooks/useDebounce';
import ReactPlayer from 'react-player/youtube';

const cx = classNames.bind(styles);

function CreateVideo({ utils }) {
    const { videoValue, setVideoValue } = utils;
    console.log(videoValue);
    const [inputValue, setInputValue] = useState(videoValue || '');

    const isValidYouTubeURL = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return pattern.test(url);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (!!value.trim()) {
            setInputValue(value);
        } else {
            setInputValue('');
            setVideoValue('');
        }
    };

    const linkValue = useDebounce(inputValue, 1000);
    useEffect(() => {
        if (!!linkValue.trim())
            if (isValidYouTubeURL(linkValue)) {
                setVideoValue(linkValue);
            } else {
                toastify('Please enter a valid YouTube link.', 'error', 1000, 'top-right');
            }
    }, [linkValue]);

    return (
        <div className={cx('wrap')}>
            <div>
                <div className={cx('video-wrap-all')}>
                    <Row>
                        <Col span={24}>
                            <Typography.Text>
                                Currently, the website only supports uploading videos via
                                <a
                                    href="https://www.youtube.com/"
                                    style={{ color: 'red', padding: '0px 4px' }}
                                >
                                    YouTube
                                </a>
                                links. Please copy the link of the{' '}
                                <a
                                    href="https://www.youtube.com/"
                                    style={{ color: 'red', padding: '0px 2px' }}
                                >
                                    YouTube
                                </a>{' '}
                                video you want to upload and paste it into the form below. Thank you!
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Flex justify="end" gap={10} style={{ marginTop: '10px' }}>
                                <Input
                                    placeholder="Paste your youtube link..."
                                    onChange={handleChange}
                                    value={inputValue}
                                />
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        setInputValue('');
                                        setVideoValue('');
                                    }}
                                >
                                    Delete link
                                </Button>
                            </Flex>
                        </Col>
                    </Row>
                    {videoValue && (
                        <div className={cx('bg-video')}>
                            <div className={cx('video-wrap')}>
                                <div className={cx('banner')}>
                                    <div className={cx('video')}>
                                        <ReactPlayer
                                            url={videoValue}
                                            controls={true}
                                            width="100%"
                                            height="100%"
                                            progressInterval={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateVideo;
