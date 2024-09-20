import classNames from 'classnames/bind';
import styles from './TeacherLessonVideo.module.scss';
import CreateVideo from './CreateVideo/CreateVideo';
import CreateDesc from './CreateDesc/CreateDesc';

const cx = classNames.bind(styles);

function TeacherLessonVideo() {
    return (
        <div className={cx('wrap')}>
            <div className="row row-cols-1 g-5">
                <div className="col">
                    <CreateVideo />
                </div>
                <div className="col">
                    <CreateDesc />
                </div>
            </div>
        </div>
    );
}

export default TeacherLessonVideo;
