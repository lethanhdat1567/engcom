import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getResponseComment, insertComment } from '~/requestApi/requestComment';
import Img from '../Img';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function FormReply({ isReply, setIsReply, parent_id, setResponses }) {
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const [isAdopt, setIsAdopt] = useState(false);
    const [commentValue, setCommentValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        if (value) {
            setIsAdopt(true);
            setCommentValue(value);
        } else {
            setIsAdopt(false);
            setCommentValue('');
        }
    };

    const handleCancle = () => {
        setIsReply(false);
        setCommentValue('');
    };

    const handleSubmit = () => {
        const values = {
            class_id: slug,
            parent_id: parent_id,
            user_id: user.id,
            content: commentValue,
        };
        setIsReply(false);
        setCommentValue('');
        insertComment(values)
            .then((res) => {
                getResponseComment(slug)
                    .then((res) => {
                        const resData = res.data;
                        const resValues = resData.filter((resItem) => {
                            return resItem.parent_id == parent_id;
                        });

                        setResponses(resValues);
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
        <div className={cx('com-head', { active: isReply })}>
            <img src={handleAvatar(user.avatar)} className={cx('com-avatar')} />
            <div className={cx('com-input-wrap')}>
                <input
                    onChange={handleChange}
                    value={commentValue}
                    className={cx('com-input')}
                    placeholder="Write comment..."
                />
                <div className={cx('com-utils')}>
                    <button className={cx('com-cancle')} onClick={handleCancle}>
                        Cancel
                    </button>
                    <button className={cx('com-submit', { active: isAdopt })} onClick={handleSubmit}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormReply;
