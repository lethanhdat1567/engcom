import classNames from 'classnames/bind';
import styles from './LessonVideo.module.scss';
import ReactPlayer from 'react-player/youtube';
import useCourseUtils from '~/utils/useCourseUtils';
import NoContenLoading from '~/components/Loading/NoContentLoading/NoContenLoading';

const cx = classNames.bind(styles);

function LessonVideo({ data }) {
    const videoContent = data.content;
    const { handleDoneLesson } = useCourseUtils();
    const handleEnd = () => {
        handleDoneLesson();
    };

    if (Object.keys(videoContent).length > 0) {
        return (
            <>
                {videoContent?.title ? (
                    <>
                        <div className={cx('bg-video')}>
                            <div className={cx('video-wrap')}>
                                <div className={cx('banner')}>
                                    <div className={cx('video')}>
                                        <ReactPlayer
                                            url={videoContent.title}
                                            controls={true}
                                            onEnded={handleEnd}
                                            width="100%"
                                            height="100%"
                                            progressInterval={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={cx('desc')}
                            dangerouslySetInnerHTML={{ __html: videoContent.text }}
                        ></div>
                    </>
                ) : (
                    <div>Error!</div>
                )}
            </>
        );
    } else {
        return <NoContenLoading />;
    }
}

export default LessonVideo;
