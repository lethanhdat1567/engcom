import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function Comment() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('heaad')}>
                <div className={cx('comment-wrap')}>
                    <Avatar size="medium">A</Avatar>
                    <input placeholder="write your comment..." className={cx('comment-input')} />
                </div>
                <span className={cx('heart-wrap')}>
                    <FontAwesomeIcon icon={faHeart} className={cx('heart')} />
                </span>
            </div>
            <div className={cx('body')}>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    );
}

export default Comment;
