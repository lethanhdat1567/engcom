import classNames from 'classnames/bind';
import styles from './AskModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import CommentItem from '../CommentItem/CommentItem';
import AskItem from './Component/AskItem/AskItem';

const cx = classNames.bind(styles);

function AskModal({ setAskModal, askModal }) {
    return (
        <div className={cx('wrap', { active: askModal })}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>Hoi dap</h3>
                <span className={cx('close')} onClick={() => setAskModal(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-xl" />
                </span>
            </div>
            <div className={cx('body')}>
                <div className={cx('ask')}>
                    <img src={imgs.unsetAvatar} className={cx('avatar')} />
                    <input className={cx('ask-input')} placeholder="your question..." />
                </div>
                <div className={cx('asks-wrap')}>
                    <AskItem />
                </div>
            </div>
        </div>
    );
}

export default AskModal;
