import classNames from 'classnames/bind';
import styles from './ReplyItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Img from '../Img';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteComment, getResponseComment } from '~/requestApi/requestComment';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function ReplyItem({ data, setResponses, commentParent }) {
    const [isDelete, setIsDelete] = useState(false);
    const user = useSelector((state) => state.user.user);
    const handleTime = () => {
        const timeString = data.updated_at;
        const timeAgo = moment(timeString).fromNow();

        return timeAgo;
    };

    const handleDelete = () => {
        setIsDelete(false);
        deleteComment(data.id).then((res) => {
            const class_id = res.data.class_id;

            getResponseComment(class_id)
                .then((res) => {
                    const resData = res.data;

                    const resValues = resData.filter((resItem) => {
                        return resItem.parent_id == commentParent;
                    });

                    setResponses(resValues);
                })
                .catch((error) => console.log(error));
        });
    };

    return (
        <div className={cx('item')}>
            <div className={cx('info-wrap')}>
                <img src={handleAvatar(data.user.avatar)} className={cx('avatar')} />
                <div className={cx('user')}>
                    <h2 className={cx('user-name')}>
                        {data.user.name} <span className={cx('timer')}>{handleTime()}</span>
                    </h2>
                    <p className={cx('content')}>{data.content}</p>
                </div>
            </div>
            <Tippy
                interactive
                placement="bottom-end"
                visible={isDelete}
                onClickOutside={() => setIsDelete(false)}
                render={(attrs) => (
                    <div {...attrs} className={cx('drop-wrap')}>
                        <ul className={cx('drop-list')}>
                            <li className={cx('item')} onClick={handleDelete}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                Delete
                            </li>
                        </ul>
                    </div>
                )}
            >
                {user.id == data.user.id && (
                    <span className={cx('setting')} onClick={() => setIsDelete(true)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                )}
            </Tippy>
        </div>
    );
}

export default ReplyItem;
