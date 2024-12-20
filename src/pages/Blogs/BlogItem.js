import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import extractContent from '~/utils/extractContent';
import { handleTime } from '~/utils/handleTime';
import Img from '~/components/Img';
import { deleteSaveBlog, insertSaveBlog } from '~/requestApi/requestBlog';
import { useDispatch, useSelector } from 'react-redux';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { validateSaveBlog } from '~/utils/validateSaveBlog';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { subToastify, toastify } from '~/utils/toast';
import Validate from '../Validate';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [loading, setLoading] = useState();
    const guest = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const saveBlogs = useSelector((state) => state.ownData.saveBlogs);
    const { blog, user } = data;
    const { content } = extractContent(blog?.content);

    const handleSaveBlog = () => {
        if (Object.keys(guest).length > 0 && guest.role_id !== 1) {
            setLoading(true);
            insertSaveBlog(guest.id, blog.id)
                .then((res) => {
                    dispatch(ownData.actions.setSaveBlog(res.data));
                    setLoading(false);
                    subToastify('Blog saved');
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            setShowRegisterModal(true);
        }
    };
    const handleUnSave = () => {
        if (Object.keys(guest).length > 0 && guest.role_id !== 1) {
            setLoading(true);
            deleteSaveBlog(guest.id, blog.id)
                .then((res) => {
                    dispatch(ownData.actions.deleteSaveBlogs(res.data.id));
                    setLoading(false);
                    subToastify('Blog deleted');
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            setShowRegisterModal(true);
        }
    };

    return (
        <>
            <section className={cx('blog')}>
                <div className={cx('header')}>
                    <Link to={`${process.env.REACT_APP_ROOT}/profile/${blog.user_id}`} className={cx('info')}>
                        <Img
                            className={cx('info-avatar')}
                            src={
                                user?.img?.includes('googleusercontent.com') ||
                                user?.img?.includes('facebook.com')
                                    ? user.img
                                    : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.img}`
                            }
                            alt="User Avatar"
                        />
                        <span className={cx('info-name')}>{user.user}</span>
                    </Link>
                    {blog.user_id != guest.id && (
                        <div className={cx('utils')}>
                            {validateSaveBlog(saveBlogs, guest.id, blog.id) ? (
                                loading ? (
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"
                                    />
                                ) : (
                                    <span className={cx('icon', 'fa-lg')} onClick={handleUnSave}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                )
                            ) : loading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"
                                />
                            ) : (
                                <span className={cx('icon', 'fa-lg')} onClick={handleSaveBlog}>
                                    <FontAwesomeIcon icon={bookmarkRegular} />
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className={cx('blog-banner')}>
                    <Link to={`${process.env.REACT_APP_ROOT}/blogs/${blog?.id}`}>
                        <img
                            className={cx('blog-img')}
                            src={
                                blog.thumbnail
                                    ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${blog.thumbnail}`
                                    : imgs.NoImg
                            }
                        />
                    </Link>
                </div>
                <div className={cx('body')}>
                    <Link to={`${process.env.REACT_APP_ROOT}/blogs/${blog?.id}`}>
                        <h3 className={cx('blog-title')}>{blog?.title}</h3>
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: content }} className={cx('body-desc')}></div>
                </div>
                <div className={cx('footer')}>
                    <span className={cx('blog-info')}>{handleTime(blog.updated_at)}</span>
                </div>
            </section>
            {showRegisterModal && (
                <Validate toggle={showRegisterModal} setToggle={setShowRegisterModal} field="Register" />
            )}
        </>
    );
}

export default BlogItem;
