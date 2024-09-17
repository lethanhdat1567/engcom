import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import ReplyItem from '../ReplyItem/ReplyItem';
import { useState } from 'react';
import FormReply from './FormReply';

const cx = classNames.bind(styles);

function CommentItem() {
    const [showRes, setShowRes] = useState(false);
    const [isReply, setIsReply] = useState(false);

    return (
        <div className={cx('item')}>
            <div className={cx('info-wrap')}>
                <img className={cx('avatar')} src={imgs.unsetAvatar} />
                <div className={cx('user')}>
                    <h2 className={cx('user-name')}>
                        Datlethanh <span className={cx('timer')}>3 months ago</span>
                    </h2>
                    <p className={cx('content')}>
                        Xin chao, co ai o day khongXin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ? ?
                    </p>
                    <div className={cx('reply-wrap')}>
                        <span className={cx('reply')} onClick={() => setIsReply(true)}>
                            Reply
                        </span>
                        <FormReply isReply={isReply} setIsReply={setIsReply} />
                    </div>
                    <div className={cx('res')} onClick={() => setShowRes(!showRes)}>
                        <span>
                            <FontAwesomeIcon icon={showRes ? faChevronUp : faChevronDown} />
                        </span>
                        <span className={cx('res-text')}>2 Respones</span>
                    </div>
                    {showRes && (
                        <div className={cx('res-body')}>
                            <ReplyItem />
                        </div>
                    )}
                </div>
            </div>
            <Tippy
                interactive
                placement="bottom-end"
                trigger="click"
                render={(attrs) => (
                    <div {...attrs} className={cx('drop-wrap')}>
                        <ul className={cx('drop-list')}>
                            <li className={cx('item')}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                Delete
                            </li>
                        </ul>
                    </div>
                )}
            >
                <span className={cx('setting')}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
            </Tippy>
        </div>
    );
}

export default CommentItem;
