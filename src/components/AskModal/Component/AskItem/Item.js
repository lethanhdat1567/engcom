import classNames from 'classnames/bind';
import styles from './AskItem.module.scss';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormReply from '../FormReply/FormReply';
import { useState } from 'react';
import ReplyItem from '../ReplyItem/ReplyItem';
import Img from '~/components/Img';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { deleteAsk } from '~/requestApi/requestAsk';
import { handleTime } from '~/utils/handleTime';
const cx = classNames.bind(styles);

function Item({ userData, askDataItem, utils }) {
    const user = useSelector((state) => state.user.user);
    const [reply, setReply] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [replyData, setReplyData] = useState([]);
    const { askData, setAskData } = utils;
    const handleDelete = () => {
        setShowDelete(false);
        deleteAsk(askDataItem.id)
            .then((res) => {
                const newArray = askData.filter((item) => item.ask.id !== res.data.ask.id);
                setAskData(newArray);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('item-wrap')}>
            <div className={cx('info-wrap')}>
                <div className={cx('info')}>
                    <Img
                        className={cx('avatar')}
                        src={
                            userData?.avatar?.includes('googleusercontent.com') ||
                            userData?.avatar?.includes('facebook.com')
                                ? userData.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${userData.avatar}`
                        }
                        alt="User Avatar"
                    />
                    <span className={cx('info-name')}>{userData.name}</span>
                    <span className={cx('info-timer')}>{handleTime(askDataItem.created_at)}</span>
                </div>
                <Tippy
                    interactive
                    visible={showDelete}
                    onClickOutside={() => setShowDelete(false)}
                    render={(attrs) => (
                        <div {...attrs} className={cx('drop-list')}>
                            <span className={cx('item')} onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> Delete
                            </span>
                        </div>
                    )}
                    placement="bottom"
                >
                    <div
                        className={cx('options', { active: user.id === userData.user_id })}
                        onClick={() => setShowDelete(!showDelete)}
                    >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </Tippy>
            </div>
            <div className={cx('content')}>{askDataItem.content}</div>
            <span className={cx('reply-btn')} onClick={() => setReply(true)}>
                Reply
            </span>
            {reply && (
                <FormReply
                    replyData={replyData}
                    setReplyData={setReplyData}
                    parentComment={askDataItem}
                    reply={reply}
                    setReply={setReply}
                />
            )}
            <div className={cx('reply-wrap')}>
                <ReplyItem replyData={replyData} setReplyData={setReplyData} askDataItem={askDataItem} />
            </div>
        </div>
    );
}

export default Item;
