import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useRef, useState } from 'react';
import imgs from '~/assets/Image';
import CommentItem from '~/components/CommentItem/CommentItem';

const cx = classNames.bind(styles);

function Comment() {
    const [isComment, setIsComment] = useState(false);
    const [isAdopt, setIsAdopt] = useState(false);
    const commentRef = useRef();

    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            setIsAdopt(true);
        } else {
            setIsAdopt(false);
        }
    };

    return (
        <div className={cx('comment-wrap')}>
            <h2 className={cx('com-title')}>3 comments</h2>
            <div className={cx('comment')}>
                <div className={cx('com-head')}>
                    <img className={cx('com-avatar')} src={imgs.unsetAvatar} />
                    <div className={cx('com-input-wrap', { active: isComment })}>
                        <input
                            ref={commentRef}
                            className={cx('com-input')}
                            placeholder="Write comment..."
                            onFocus={() => setIsComment(true)}
                            onChange={handleChange}
                        />
                        <div className={cx('com-utils')}>
                            <button className={cx('com-cancle')} onClick={() => setIsComment(false)}>
                                Cancle
                            </button>
                            <button
                                type={isAdopt ? 'submit' : ''}
                                className={cx('com-submit', { active: isAdopt })}
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('comment-body')}>
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </div>
            </div>
        </div>
    );
}

export default Comment;
