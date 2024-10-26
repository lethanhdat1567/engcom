import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useEffect, useRef, useState } from 'react';
import CommentItem from '~/components/CommentItem/CommentItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComment, insertComment } from '~/requestApi/requestComment';
import Skeleton from 'react-loading-skeleton';
import { handleAvatar } from '~/utils/handleAvatar';
import TextareaAutosize from 'react-textarea-autosize';

const cx = classNames.bind(styles);

function Comment() {
    const user = useSelector((state) => state.user.user);
    const { slug } = useParams();
    const [isComment, setIsComment] = useState(false);
    const [isAdopt, setIsAdopt] = useState(false);
    const [valueComment, setValueComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const commentRef = useRef();

    const handleChange = (e) => {
        const value = e.target.value;

        if (value) {
            setIsAdopt(true);
            setValueComment(value);
        } else {
            setIsAdopt(false);
            setValueComment('');
        }
    };

    const handleCancle = () => {
        setIsComment(false);
        setValueComment('');
    };

    useEffect(() => {
        setLoading(true);
        getComment(slug)
            .then((res) => {
                setLoading(false);
                setComments(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (valueComment) {
            setIsAdopt(true);
        } else {
            setIsAdopt(false);
        }
    }, [valueComment]);

    const handleSubmit = () => {
        if (valueComment.trim()) {
            const values = {
                class_id: slug,
                parent_id: null,
                user_id: user.id,
                content: valueComment,
            };
            setIsComment(false);
            setValueComment('');
            insertComment(values)
                .then((res) => {
                    getComment(res.data.class_id)
                        .then((res) => {
                            setComments(res.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className={cx('comment-wrap')}>
            {loading ? (
                <Skeleton height={50} count={8} style={{ margin: '10px 0px' }} />
            ) : (
                <>
                    <h2 className={cx('com-title')}>{comments.length} comments</h2>
                    <div className={cx('comment')}>
                        <div className={cx('com-head')}>
                            <img src={handleAvatar(user.avatar)} className={cx('com-avatar')} />
                            <div className={cx('com-input-wrap', { active: isComment })}>
                                <TextareaAutosize
                                    style={{
                                        border: 'none',
                                        resize: 'none',
                                        width: '100%',
                                        outline: 'none',
                                    }}
                                    ref={commentRef}
                                    className={cx('com-input')}
                                    placeholder="Write comment..."
                                    value={valueComment}
                                    onFocus={() => setIsComment(true)}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <div className={cx('com-utils')}>
                                    <button className={cx('com-cancle')} onClick={handleCancle}>
                                        Cancle
                                    </button>
                                    <button
                                        className={cx('com-submit', { active: isAdopt })}
                                        onClick={handleSubmit}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('comment-body')}>
                            {comments.map((item, index) => {
                                return <CommentItem setComments={setComments} item={item} key={index} />;
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Comment;
