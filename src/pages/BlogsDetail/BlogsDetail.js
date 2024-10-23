import classNames from 'classnames/bind';
import styles from './BlogsDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteSaveBlog, insertSaveBlog, readBlog } from '~/requestApi/requestBlog';
import BlogDetailLoading from '~/components/Loading/BlogDetailLoading/BlogDetailLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { handleTime } from '~/utils/handleTime';
import { handleAvatar } from '~/utils/handleAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { validateSaveBlog } from '~/utils/validateSaveBlog';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { toastify } from '~/utils/toast';
import Validate from '../Validate';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BlogsDetail() {
    const { slug } = useParams();
    const guest = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const saveBlogs = useSelector((state) => state.ownData.saveBlogs);
    const [content, setContent] = useState({});
    const [title, setTitle] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [saveBlogLoading, setSaveBlogLoading] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        readBlog(slug)
            .then((res) => {
                setContent(res.data.blog);
                setTitle(res.data.blog.title);
                setUserInfo(res.data.user);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);
    const handleSaveBlog = () => {
        if (Object.keys(guest).length > 0) {
            setSaveBlogLoading(true);
            insertSaveBlog(guest.id, content.id)
                .then((res) => {
                    dispatch(ownData.actions.setSaveBlog(res.data));
                    setSaveBlogLoading(false);
                    toastify('blog saved', 'success');
                })
                .catch((error) => {
                    console.log(error);
                    setSaveBlogLoading(false);
                });
        } else {
            setShowRegisterModal(true);
        }
    };
    const handleUnSave = () => {
        if (Object.keys(guest).length > 0) {
            setSaveBlogLoading(true);
            deleteSaveBlog(guest.id, content.id)
                .then((res) => {
                    dispatch(ownData.actions.deleteSaveBlogs(res.data.id));
                    setSaveBlogLoading(false);
                    toastify('blog deleted', 'success');
                })
                .catch((error) => {
                    console.log(error);
                    setSaveBlogLoading(false);
                });
        } else {
            setShowRegisterModal(true);
        }
    };
    return (
        <>
            <div className={cx('wrap')}>
                {loading ? (
                    <BlogDetailLoading />
                ) : (
                    <>
                        <h1 className={cx('title')}>{title}</h1>
                        <div className={cx('user-info')}>
                            <div className={cx('left')}>
                                <img src={handleAvatar(userInfo.avatar)} className={cx('avatar')} />
                                <div className={cx('info')}>
                                    <span className={cx('name')}>{userInfo?.name}</span>
                                    <span className={cx('timer')}>{handleTime(content.created_at)}</span>
                                </div>
                            </div>
                            {guest.role_id !== 4 && (
                                <div className={cx('right')}>
                                    <div className={cx('utils')}>
                                        {validateSaveBlog(saveBlogs, guest.id, content.id) ? (
                                            saveBlogLoading ? (
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"
                                                />
                                            ) : (
                                                <span className={cx('icon', 'fa-lg')} onClick={handleUnSave}>
                                                    <FontAwesomeIcon icon={bookmarkSolid} />
                                                </span>
                                            )
                                        ) : saveBlogLoading ? (
                                            <FontAwesomeIcon
                                                icon={faSpinner}
                                                className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"
                                            />
                                        ) : (
                                            <span className={cx('icon', 'fa-lg')} onClick={handleSaveBlog}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
                    </>
                )}
            </div>
            {showRegisterModal && (
                <Validate toggle={showRegisterModal} setToggle={setShowRegisterModal} field="Register" />
            )}
        </>
    );
}

export default BlogsDetail;
