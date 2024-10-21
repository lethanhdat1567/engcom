import classNames from 'classnames/bind';
import styles from './FormReply.module.scss';
import imgs from '~/assets/Image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { insertAsk } from '~/requestApi/requestAsk';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function FormReply({ reply, setReply, parentComment, setReplyData }) {
    const [replyInput, setReplyInput] = useState('');
    const [adopt, setAdopt] = useState(false);
    const user = useSelector((state) => state.user.user);
    const currentLesson = useSelector((state) => state.course.selectedLesson);
    const handleChange = (e) => {
        if (e.target.value.trim()) {
            setReplyInput(e.target.value);
            setAdopt(true);
        } else {
            setReplyInput('');
            setAdopt(false);
        }
    };

    const handleSubmit = () => {
        const values = {
            user_id: user.id,
            lesson_id: currentLesson.id,
            parent_id: parentComment.id,
            content: replyInput,
        };

        setReply(false);
        insertAsk(values)
            .then((res) => {
                setReplyData((prev) => [...prev, res.data]);
            })
            .catch((error) => {
                setReply(false);
            });
    };
    return (
        <div className={cx('reply')}>
            <div className={cx('ask')}>
                <Img
                    className={cx('avatar')}
                    src={
                        user?.avatar?.includes('googleusercontent.com') ||
                        user?.avatar?.includes('facebook.com')
                            ? user.avatar
                            : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                    }
                    alt="User Avatar"
                />
                <input
                    className={cx('ask-input')}
                    placeholder="your question..."
                    onChange={(e) => handleChange(e)}
                    value={replyInput}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <div className={cx('com-utils')}>
                <button className={cx('com-cancle')} onClick={() => setReply(false)}>
                    Cancle
                </button>
                <button className={cx('com-submit', { active: adopt })} onClick={handleSubmit}>
                    Comment
                </button>
            </div>
        </div>
    );
}

export default FormReply;
