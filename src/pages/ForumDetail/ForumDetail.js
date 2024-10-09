import classNames from 'classnames/bind';
import styles from './ForumDetail.module.scss';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';

import Slider from './components/Slider/Slider';
import Comment from './components/Comment/Comment';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function ForumDetail() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrap')}>
            <span className={cx('back')} onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <div className={cx('header')}>
                <Avatar>A</Avatar>
                <h3 className={cx('title')}>Le Thanh Dat</h3>
                <span className={cx('timer')}>3 months ago</span>
                <Tippy
                    interactive
                    trigger="click"
                    placement="bottom-end"
                    render={(attrs) => (
                        <div {...attrs} className={cx('dropdown')}>
                            <span className={cx('drop-item')}>
                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px' }} />
                                Delete
                            </span>
                        </div>
                    )}
                >
                    <span className={cx('option')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                </Tippy>
            </div>
            <p className={cx('desc')}>
                sadsadashdssadsadashdssadsadashdssadsadashdssadsadashdssadsadashdssadsadashdssadsadashds
            </p>
            <Slider />
            <Comment />
        </div>
    );
}

export default ForumDetail;
