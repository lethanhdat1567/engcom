import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function CommentItem() {
    return (
        <div className={cx('comment-item')}>
            <Avatar className={cx('avatar')}>A</Avatar>
            <div className={cx('comment-item-content-wrap')}>
                <div className={cx('comment-item-content')}>
                    <span className={cx('comment-item-content-title')}>Le thanh dat</span>
                    <span className={cx('comment-item-content-timmer')}>3 months ago</span>
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom"
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
                    Andy’s looks like a turkey. But Ryan’s was Probably the best out of the lot. Also what are
                    they using to “draw” with?
                </p>
            </div>
        </div>
    );
}

export default CommentItem;
