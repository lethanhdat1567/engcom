import classNames from 'classnames/bind';
import styles from './ReplyItem.module.scss';
import imgs from '~/assets/Image';
import Img from '~/components/Img';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { deleteAsk } from '~/requestApi/requestAsk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleTime } from '~/utils/handleTime';

const cx = classNames.bind(styles);

function Item({ reply, askData, setAskData }) {
    const [showDelete, setShowDelete] = useState(false);
    const user = reply.user;
    const ask = reply.ask;

    const handleDelete = () => {
        setShowDelete(false);
        deleteAsk(ask.id)
            .then((res) => {
                const newArray = askData.filter((item) => item.ask.id !== res.data.ask.id);
                setAskData(newArray);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('item')}>
            <div className={cx('info-wrap')}>
                <div className={cx('info')}>
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
                    <span className={cx('info-name')}>{user.name}</span>
                    <span className={cx('info-timer')}>{handleTime(ask.created_at)}</span>
                </div>
                {ask.user_id === user.id && (
                    <Tippy
                        interactive
                        visible={showDelete}
                        onClickOutside={() => setShowDelete(false)}
                        render={(attrs) => (
                            <div {...attrs} className={cx('drop-list')}>
                                <span className={cx('drop-item')} onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> Delete
                                </span>
                            </div>
                        )}
                        placement="bottom"
                    >
                        <div
                            className={cx('options', { active: user.id === user.user_id })}
                            onClick={() => setShowDelete(!showDelete)}
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div>
                    </Tippy>
                )}
            </div>
            <div className={cx('content')}>{ask.content}</div>
        </div>
    );
}

export default Item;
