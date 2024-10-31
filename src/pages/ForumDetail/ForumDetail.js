import classNames from 'classnames/bind';
import styles from './ForumDetail.module.scss';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeRegular } from '@fortawesome/free-regular-svg-icons';
import Slider from './components/Slider/Slider';
import Comment from './components/Comment/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { deleteLikePost, getCommentPost, getDetailPost, inserLikePost } from '~/requestApi/requestPost';
import { handleTime } from '~/utils/handleTime';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import { validatePostLike, validatePostLikeValue } from '~/utils/validatePostLike';
import { post_like } from '~/redux/reducer/postLike';
import Skeleton from 'react-loading-skeleton';
import ZoomImage from '~/components/ZoomImage/ZoomImage';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function ForumDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [postValue, setPostValue] = useState({});
    const [commentPost, setCommentPost] = useState([]);
    const user = useSelector((state) => state.user.user);
    const post_likes = useSelector((state) => state.post_like.post_like);
    const post_like_item = post_likes.filter((item) => item.post_id == slug);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(validatePostLike(post_likes, parseInt(slug), user.id));
    const [likeValue, setLikeValue] = useState();
    const likeDebounce = useDebounce(likeValue, 500);
    const [isZoomIn, setIsZoomIn] = useState(false);
    const [zoomSrc, setZoomSrc] = useState('');

    console.log('current_user: ', user);
    console.log('user: ', postValue);

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            // Delete liked
            setLikeValue({});
        } else {
            // Insert liked
            const insertValue = {
                user_id: user.id,
                post_id: postValue.id,
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
                const likeValue = validatePostLikeValue(post_likes, postValue.id, user.id);
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

    useEffect(() => {
        setLoading(true);
        getDetailPost(slug)
            .then((res) => {
                setPostValue(res);
                getCommentPost(res.id)
                    .then((res) => {
                        setCommentPost(res.comments);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [slug]);

    return loading ? (
        <div className={cx('wrap')}>
            <div className={cx('head-load')}>
                <div className={cx('avatar-load')}>
                    <Skeleton height={50} />
                </div>
                <div style={{ width: '100%' }}>
                    <Skeleton style={{ flex: 1, width: '100%' }} height={40} />
                </div>
            </div>
            <div className={cx('content-load')}>
                <Skeleton width="100%" height={100} />
                <Skeleton height={250} style={{ margin: '10px 0px' }} />
            </div>
            <div className={cx('comment-load')}>
                <Skeleton width="100%" height={50} count={5} style={{ margin: '10px 0px' }} />
            </div>
        </div>
    ) : (
        <>
            <div className={cx('wrap')}>
                <span className={cx('back')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                <div className={cx('header')}>
                    <Avatar style={{ flexShrink: '0' }} src={handleAvatar(postValue?.user?.avatar)} />
                    <h3 className={cx('title')}>{postValue?.user?.name}</h3>
                    <span className={cx('timer')}>{handleTime(postValue?.created_at)}</span>
                    {user.id == postValue?.user?.user_id && (
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
                    )}
                </div>
                <p className={cx('desc')}>{postValue?.content}</p>
                <Slider setIsZoomIn={setIsZoomIn} setZoomSrc={setZoomSrc} images={postValue?.thumbnails} />
                <div className={cx('footer')}>
                    <div className={cx('footer-wrap')} onClick={handleLike}>
                        <span className={cx('header-wrap')}>
                            <FontAwesomeIcon icon={isLiked ? faHeart : LikeRegular} />
                        </span>
                        <span className={cx('header-sub')}>{post_like_item?.length}</span>
                    </div>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('header-wrap')}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className={cx('header-sub')}>{commentPost?.length}</span>
                    </div>
                </div>
                <Comment commentPost={commentPost} setCommentPost={setCommentPost} />
            </div>
            <ZoomImage src={zoomSrc} setIsZoomIn={setIsZoomIn} isZoomIn={isZoomIn} />
        </>
    );
}

export default ForumDetail;
