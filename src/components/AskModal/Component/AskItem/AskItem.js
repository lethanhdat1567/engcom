import classNames from 'classnames/bind';
import styles from './AskItem.module.scss';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FormReply from '../FormReply/FormReply';
import { useState } from 'react';
import ReplyItem from '../ReplyItem/ReplyItem';

const cx = classNames.bind(styles);

function AskItem() {
    const [reply, setReply] = useState(false);

    return (
        <div className={cx('wrap')}>
            <div className={cx('info')}>
                <img className={cx('avatar')} src={imgs.unsetAvatar} />
                <span className={cx('info-name')}>Le thanh Dat</span>
            </div>
            <div className={cx('content')}>
                sdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsads
            </div>
            <span className={cx('reply-btn')} onClick={() => setReply(true)}>
                Reply
            </span>
            {reply && <FormReply reply={reply} setReply={setReply} />}
            <div className={cx('reply-wrap')}>
                <ReplyItem />
            </div>
        </div>
    );
}

export default AskItem;
