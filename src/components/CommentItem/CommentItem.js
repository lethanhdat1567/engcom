import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import ReplyItem from '../ReplyItem/ReplyItem';
import { useEffect, useState } from 'react';
import FormReply from './FormReply';
import { useSelector } from 'react-redux';
import { deleteComment, getComment, getResponseComment } from '~/requestApi/requestComment';
import moment from 'moment';
import Img from '../Img';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function CommentItem({ item, setComments }) {
    const user = useSelector((state) => state.user.user);
    const { slug } = useParams();
    const owner = item.user;
    const commentParent = item.id;
    const [showRes, setShowRes] = useState(false);
    const [isReply, setIsReply] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [responses, setResponses] = useState([]);

    const handleTime = () => {
        const timeString = item.updated_at;
        const timeAgo = moment(timeString).fromNow();

        return timeAgo;
    };

    const handleDelete = () => {
        setIsDelete(false);
        deleteComment(item.id).then((res) => {
            getComment(res.data.class_id)
                .then((res) => {
                    setComments(res.data);
                })
                .catch((error) => console.log(error));
        });
    };

    useEffect(() => {
        getResponseComment(slug)
            .then((res) => {
                const resData = res.data;

                const resValues = resData.filter((resItem) => {
                    return resItem.parent_id == item.id;
                });

                setResponses(resValues);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('item')}>
            <div className={cx('info-wrap')}>
                <Img src={owner.avatar || ''} className={cx('avatar')} />
                <div className={cx('user')}>
                    <h2 className={cx('user-name')}>
                        {owner.name} <span className={cx('timer')}>{handleTime()}</span>
                    </h2>
                    <p className={cx('content')}>{item.content}</p>
                    <div className={cx('reply-wrap')}>
                        <span className={cx('reply')} onClick={() => setIsReply(true)}>
                            Reply
                        </span>
                        <FormReply
                            parent_id={item.id}
                            isReply={isReply}
                            setIsReply={setIsReply}
                            setResponses={setResponses}
                        />
                    </div>

                    {responses.length > 0 && (
                        <div className={cx('res', { expand: isReply })} onClick={() => setShowRes(!showRes)}>
                            <span>
                                <FontAwesomeIcon icon={showRes ? faChevronUp : faChevronDown} />
                            </span>
                            <span className={cx('res-text')}>{responses.length} Respones</span>
                        </div>
                    )}
                    {showRes &&
                        responses.map((item, index) => (
                            <div className={cx('res-body')} key={index}>
                                <ReplyItem
                                    setResponses={setResponses}
                                    data={item}
                                    commentParent={commentParent}
                                />
                            </div>
                        ))}
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
                {user.id === item.user.id && (
                    <span className={cx('setting')} onClick={() => setIsDelete(true)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                )}
            </Tippy>
        </div>
    );
}

export default CommentItem;
