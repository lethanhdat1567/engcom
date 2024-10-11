import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Avatar } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Post.scss';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeaderSolid } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { handleAvatar } from '~/utils/handleAvatar';
import { handleTime } from '~/utils/handleTime';
import { deleteLikePost, deletePost, inserLikePost } from '~/requestApi/requestPost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { validatePostLike, validatePostLikeValue } from '~/utils/validatePostLike';
import useDebounce from '~/hooks/useDebounce';
import { post_like } from '~/redux/reducer/postLike';
import { error } from 'jodit/esm/core/helpers';
import ZoomImage from '~/components/ZoomImage/ZoomImage';

const cx = classNames.bind(styles);

function PostItem({ post, postValues, setPostValues }) {
    const [showDelete, setShowDelete] = useState(false);
    const user = useSelector((state) => state.user.user);
    const post_likes = useSelector((state) => state.post_like.post_like);
    const post_like_item = post_likes.filter((item) => item.post_id === post.id);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(validatePostLike(post_likes, post.id, user.id));
    const [likeValue, setLikeValue] = useState();
    const [isZoomIn, setIsZoomIn] = useState(false);
    const [zoomImgSrc, setZoomImgSrc] = useState('');
    const likeDebounce = useDebounce(likeValue, 500);

    const handleZoom = (src) => {
        setIsZoomIn(true);
        setZoomImgSrc(src);
    };
    // delete
    const handleDeletePost = () => {
        setShowDelete(false);
        deletePost(post.id)
            .then((res) => {
                const newPosts = postValues.filter((post) => post.id !== res.data.id);
                setPostValues(newPosts);
            })
            .catch((error) => console.log(error));
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            // Delete liked
            setLikeValue({});
        } else {
            // Insert liked
            const insertValue = {
                user_id: user.id,
                post_id: post.id,
            };
            setLikeValue(insertValue);
        }
    };

    useEffect(() => {
        if (likeValue) {
            // Insert
            if (Object.keys(likeValue).length > 0) {
                inserLikePost(likeValue)
                    .then((res) => {
                        dispatch(post_like.actions.setLiked(res.data));
                    })
                    .catch((error) => {
                        console.log('error');
                    });
                setLikeValue();
            } else {
                // Delete
                const likeValue = validatePostLikeValue(post_likes, post.id, user.id);
                if (likeValue) {
                    deleteLikePost(likeValue.id)
                        .then((res) => {
                            dispatch(post_like.actions.deleteLiked(res.data.id));
                        })
                        .catch((error) => {
                            console.log('error');
                        });
                    setLikeValue();
                }
            }
        }
    }, [likeDebounce]);

    if (post && Object.keys(post).length > 0) {
        const userData = post.user;
        return (
            <>
                <div className={cx('post')}>
                    <Avatar style={{ flexShrink: 0 }} src={handleAvatar(userData.avatar)} />
                    <div className={cx('body')}>
                        <div className={cx('head-name')}>
                            <h3 className={cx('name')}>{userData.name}</h3>
                            <span className={cx('timer')}>{handleTime(post.created_at)}</span>
                            {post.user.user_id === user.id && (
                                <Tippy
                                    interactive
                                    visible={showDelete}
                                    onClickOutside={() => setShowDelete(false)}
                                    placement="bottom"
                                    render={(attrs) => (
                                        <div {...attrs} className={cx('dropdown')}>
                                            <span className={cx('drop-item')} onClick={handleDeletePost}>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ marginRight: '4px' }}
                                                />
                                                Delete
                                            </span>
                                        </div>
                                    )}
                                >
                                    <span className={cx('option')} onClick={() => setShowDelete(true)}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </span>
                                </Tippy>
                            )}
                        </div>
                        <p className={cx('content')}>{post.content}</p>
                        <div className={cx('slider')}>
                            <Swiper
                                className={'slider-post'}
                                spaceBetween={10}
                                slidesPerView="auto"
                                autoplay={{ delay: 5000 }}
                            >
                                {post?.thumbnails?.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index} onClick={() => handleZoom(item)}>
                                            <div className={cx('banner')}>
                                                <img
                                                    src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${item}`}
                                                    className={cx('img')}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('footer-wrap')} onClick={handleLike}>
                                <span className={cx('header')}>
                                    <FontAwesomeIcon icon={isLiked ? faHeaderSolid : faHeart} />
                                </span>
                                <span className={cx('header-sub')}>{post_like_item.length}</span>
                            </div>
                            <Link to={`${process.env.REACT_APP_ROOT}/community/forum/${post.id}`}>
                                <div className={cx('footer-wrap')}>
                                    <span className={cx('header')}>
                                        <FontAwesomeIcon icon={faComment} />
                                    </span>
                                    <span className={cx('header-sub')}>{post.commentcount}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <ZoomImage isZoomIn={isZoomIn} setIsZoomIn={setIsZoomIn} src={zoomImgSrc} />
            </>
        );
    }
}

export default PostItem;
