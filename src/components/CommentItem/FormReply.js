import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import imgs from '~/assets/Image';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function FormReply({ isReply, setIsReply }) {
    const [isAdopt, setIsAdopt] = useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            setIsAdopt(true);
        } else {
            setIsAdopt(false);
        }
    };

    return (
        <div className={cx('com-head', { active: isReply })}>
            <img className={cx('com-avatar')} src={imgs.unsetAvatar} />
            <div className={cx('com-input-wrap')}>
                <input onChange={handleChange} className={cx('com-input')} placeholder="Write comment..." />
                <div className={cx('com-utils')}>
                    <button className={cx('com-cancle')} onClick={() => setIsReply(false)}>
                        Cancle
                    </button>
                    <button type={isAdopt ? 'submit' : ''} className={cx('com-submit', { active: isAdopt })}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormReply;
