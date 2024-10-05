import classNames from 'classnames/bind';
import styles from './LessonVideo.module.scss';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import useCourseUtils from '~/utils/useCourseUtils';

const cx = classNames.bind(styles);

function LessonVideo({ data }) {
    const videoContent = data.content;
    const { handleDoneLesson } = useCourseUtils();
    const user = useSelector((state) => state.user.user);

    const handleEnd = () => {
        handleDoneLesson();
    };
    if (videoContent) {
        return (
            <>
                <div className={cx('bg-video')}>
                    <div className={cx('video-wrap')}>
                        <div className={cx('banner')}>
                            <div className={cx('video')}>
                                <ReactPlayer
                                    url={`${process.env.REACT_APP_BACKEND_UPLOAD}/videos/${videoContent.video}`} // Đường dẫn đến video
                                    controls={true} // Hiển thị các điều khiển video
                                    onEnded={handleEnd}
                                    width="100%"
                                    height="100%"
                                    progressInterval={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: videoContent.content }}></div>
            </>
        );
    } else {
        return <div>Chua co content !!!!</div>;
    }
}

export default LessonVideo;
