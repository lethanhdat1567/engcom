import classNames from 'classnames/bind';
import styles from './ForumDetail.module.scss';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faEllipsisVertical,
    faHeart,
    faRightFromBracket,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

import Slider from './components/Slider/Slider';
import Comment from './components/Comment/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { getCommentPost, getDetailPost } from '~/requestApi/requestPost';
import { handleTime } from '~/utils/handleTime';

const cx = classNames.bind(styles);

function ForumDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [postValue, setPostValue] = useState({});
    const [commentPost, setCommentPost] = useState([]);

    useEffect(() => {
        getDetailPost(slug)
            .then((res) => {
                setPostValue(res);
                getCommentPost(res.id)
                    .then((res) => {
                        setCommentPost(res.comments);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [slug]);

    if (Object.keys(postValue).length > 0) {
        return (
            <div className={cx('wrap')}>
                <span className={cx('back')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                <div className={cx('header')}>
                    <Avatar style={{ flexShrink: '0' }}>A</Avatar>
                    <h3 className={cx('title')}>{postValue.user.name}</h3>
                    <span className={cx('timer')}>{handleTime(postValue.created_at)}</span>
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom-end"
                        render={(attrs) => (
                            <div {...attrs} className={cx('dropdown')}>
                                <span className={cx('drop-item')}>
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px' }} />
                                    Delete
                                </span>
                            </div>
                        )}
                    >
                        <span className={cx('option')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                    </Tippy>
                </div>
                <p className={cx('desc')}>{postValue.content}</p>
                <Slider images={postValue.thumbnails} />
                <div className={cx('footer')}>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('header-wrap')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span className={cx('header-sub')}>{postValue.likecount}</span>
                    </div>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('header-wrap')}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className={cx('header-sub')}>{commentPost.length}</span>
                    </div>
                </div>
                <Comment commentPost={commentPost} setCommentPost={setCommentPost} />
            </div>
        );
    }
}

export default ForumDetail;
