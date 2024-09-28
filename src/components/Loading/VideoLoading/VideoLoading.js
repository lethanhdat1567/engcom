import classNames from 'classnames/bind';
import styles from './VideoLoading.module.scss';
import { PulseLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function VideoLoading() {
    return (
        <div className={cx('wrap')}>
            <span className={cx('wrap-title')}>Uploading</span>
            <PulseLoader color="#767373" />
        </div>
    );
}

export default VideoLoading;
