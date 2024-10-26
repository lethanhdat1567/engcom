import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { Avatar, Button } from 'antd';
import CommentItem from './CommentItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { insertCommentPost } from '~/requestApi/requestPost';
import { handleAvatar } from '~/utils/handleAvatar';
import TextareaAutosize from 'react-textarea-autosize';

const cx = classNames.bind(styles);

function Comment({ commentPost, setCommentPost }) {
    const user = useSelector((state) => state.user.user);
    const { slug } = useParams();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.trim()) {
            setInputValue(value);
        } else {
            setInputValue('');
        }
    };

    const handleSubmitComment = () => {
        setInputValue('');
        if (inputValue.trim()) {
            const insertValue = {
                user_id: user.id,
                post_id: slug,
                content: inputValue,
            };
            insertCommentPost(insertValue)
                .then((res) => {
                    setCommentPost((prev) => [res, ...prev]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('heaad')}>
                <div className={cx('comment-wrap')}>
                    <Avatar src={handleAvatar(user.avatar)} size="medium" style={{ flexShrink: 0 }} />
                    <TextareaAutosize
                        style={{
                            border: 'none',
                            resize: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                        placeholder="write your comment..."
                        className={cx('comment-input')}
                        onChange={handleChange}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmitComment();
                            }
                        }}
                    />
                </div>
                <Button type="primary" disabled={!inputValue.trim()} onClick={handleSubmitComment}>
                    Send
                </Button>
            </div>
            <div className={cx('body')}>
                {commentPost.map((item, index) => {
                    return <CommentItem comment={item} setCommentPost={setCommentPost} key={index} />;
                })}
            </div>
        </div>
    );
}

export default Comment;
