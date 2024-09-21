import classNames from 'classnames/bind';
import styles from './TeacherLessonVideo.module.scss';
import CreateVideo from './CreateVideo/CreateVideo';
import CreateDesc from './CreateDesc/CreateDesc';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function TeacherLessonVideo() {
    return (
        <div className={cx('wrap')}>
            {/* Create */}
            {/* <div className="row row-cols-1 g-5">
                <div className="col">
                    <CreateVideo />
                </div>
                <div className="col">
                    <CreateDesc />
                </div>
            </div> */}
            <div className={cx('bg-video')}>
                <div className={cx('video-wrap')}>
                    <div className={cx('banner')}>
                        <video className={cx('video')} controls>
                            <source src={imgs.videoTest} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            <div className={cx('desc')}>Alo ALo aLo</div>
        </div>
    );
}

export default TeacherLessonVideo;
