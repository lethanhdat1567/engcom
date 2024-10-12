import classNames from 'classnames/bind';
import styles from './ZoomMeeting.module.scss';
import HeaderZoom from './Components/HeaderZoom/HeaderZoom';
import CreateMeeting from './Components/CreateMeeting/CreateMeeting';
import JoinMeeting from './Components/JoinMeeting/JoinMeeting';

const cx = classNames.bind(styles);

function ZoomMeeting() {
    return (
        <div className={cx('wrap')}>
            <HeaderZoom />
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-lg-2 g-5">
                    <div className="col">
                        <CreateMeeting />
                    </div>
                    <div className="col">
                        <JoinMeeting />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZoomMeeting;
