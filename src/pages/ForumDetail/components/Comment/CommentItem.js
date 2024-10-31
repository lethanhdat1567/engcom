import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { handleAvatar } from '~/utils/handleAvatar';
import { handleTime } from '~/utils/handleTime';
import { deleteCommentPost } from '~/requestApi/requestPost';
import { error } from 'jodit/esm/core/helpers';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CommentItem({ comment, setCommentPost }) {
    const user = useSelector((state) => state.user.user);
    const [isShowDelete, setIsShowDelete] = useState(false);

    const handleDelete = () => {
        setIsShowDelete(false);
        deleteCommentPost(comment.comment_id)
            .then((res) => {
                const comment_id = res.data.id;
                setCommentPost((prev) => {
                    return prev.filter((comment) => comment.comment_id !== comment_id);
                });
            })
            .catch((error) => {
                console.log(error);
                setIsShowDelete(false);
            });
    };
    if (Object.keys(comment).length > 0) {
        return (
            <div className={cx('comment-item')}>
                <Avatar className={cx('avatar')} src={handleAvatar(comment.commenter_avatar)} />
                <div className={cx('comment-item-content-wrap')}>
                    <div className={cx('comment-item-content')}>
                        <span className={cx('comment-item-content-title')}>{comment.commenter_name}</span>
                        <span className={cx('comment-item-content-timmer')}>
                            {handleTime(comment.comment_created_at)}
                        </span>
                        {comment.commenter_user_id == user.id && (
                            <Tippy
                                interactive
                                visible={isShowDelete}
                                onClickOutside={() => setIsShowDelete(false)}
                                placement="bottom"
                                render={(attrs) => (
                                    <div {...attrs} className={cx('dropdown')}>
                                        <span className={cx('drop-item')} onClick={handleDelete}>
                                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px' }} />
                                            Delete
                                        </span>
                                    </div>
                                )}
                            >
                                <span className={cx('option')} onClick={() => setIsShowDelete(true)}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </span>
                            </Tippy>
                        )}
                    </div>
                    <p className={cx('desc')}>{comment.comment_content}</p>
                </div>
            </div>
        );
    }
}

export default CommentItem;
