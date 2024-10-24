import classNames from 'classnames/bind';
import styles from './ZoomMeeting.module.scss';
import HeaderZoom from './Components/HeaderZoom/HeaderZoom';
import CreateMeeting from './Components/CreateMeeting/CreateMeeting';
import JoinMeeting from './Components/JoinMeeting/JoinMeeting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ZoomMeeting() {
    return (
        <div className={cx('wrap')}>
            <HeaderZoom />
            <div className={cx('body')}>
                <Tippy content="Exit" placement="right">
                    <Link to={`${process.env.REACT_APP_ROOT}/community`} className={cx('icon')}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                </Tippy>
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
