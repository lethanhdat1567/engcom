import classNames from 'classnames/bind';
import styles from './FormReply.module.scss';
import imgs from '~/assets/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FormReply({ reply, setReply }) {
    const [replyInput, setReplyInput] = useState('');
    const [adopt, setAdopt] = useState(false);

    const handleChange = (e) => {
        if (e.target.value.trim()) {
            setReplyInput(e.target.value);
            setAdopt(true);
        } else {
            setReplyInput('');
            setAdopt(false);
        }
    };
    return (
        <div className={cx('reply')}>
            <div className={cx('ask')}>
                <img src={imgs.unsetAvatar} className={cx('avatar')} />
                <input
                    className={cx('ask-input')}
                    placeholder="your question..."
                    onChange={(e) => handleChange(e)}
                    value={replyInput}
                />
            </div>
            <div className={cx('com-utils')}>
                <button className={cx('com-cancle')} onClick={() => setReply(false)}>
                    Cancle
                </button>
                <button className={cx('com-submit', { active: adopt })}>Comment</button>
            </div>
        </div>
    );
}

export default FormReply;
