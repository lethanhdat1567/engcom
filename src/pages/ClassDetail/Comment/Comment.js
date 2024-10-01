import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useEffect, useRef, useState } from 'react';
import imgs from '~/assets/Image';
import CommentItem from '~/components/CommentItem/CommentItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComment, insertComment } from '~/requestApi/requestComment';

const cx = classNames.bind(styles);

function Comment() {
    const user = useSelector((state) => state.user.user);
    const { slug } = useParams();
    const [isComment, setIsComment] = useState(false);
    const [isAdopt, setIsAdopt] = useState(false);
    const [valueComment, setValueComment] = useState('');
    const [comments, setComments] = useState([]);
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
        getComment(slug)
            .then((res) => {
                setComments(res.data);
            })
            .catch((error) => {
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
    };
    return (
        <div className={cx('comment-wrap')}>
            <h2 className={cx('com-title')}>{comments.length} comments</h2>
            <div className={cx('comment')}>
                <div className={cx('com-head')}>
                    <img className={cx('com-avatar')} src={imgs.unsetAvatar} />
                    <div className={cx('com-input-wrap', { active: isComment })}>
                        <input
                            ref={commentRef}
                            className={cx('com-input')}
                            placeholder="Write comment..."
                            value={valueComment}
                            onFocus={() => setIsComment(true)}
                            onChange={handleChange}
                        />
                        <div className={cx('com-utils')}>
                            <button className={cx('com-cancle')} onClick={handleCancle}>
                                Cancle
                            </button>
                            <button className={cx('com-submit', { active: isAdopt })} onClick={handleSubmit}>
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
        </div>
    );
}

export default Comment;
