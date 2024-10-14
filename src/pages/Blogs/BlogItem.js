import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import InfoItem from '~/components/InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import extractContent from '~/utils/extractContent';
import { handleTime } from '~/utils/handleTime';
import { handleAvatar } from '~/utils/handleAvatar';
import Img from '~/components/Img';
import { deleteSaveBlog, insertSaveBlog } from '~/requestApi/requestBlog';
import { useDispatch, useSelector } from 'react-redux';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { validateSaveBlog } from '~/utils/validateSaveBlog';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toastify } from '~/utils/toast';
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

    const ellipData = [
        {
            title: 'Chia se len Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} />,
        },
        {
            title: 'Chia se len Instagram',
            icon: <FontAwesomeIcon icon={faInstagram} />,
        },
        {
            title: 'Chia se len Twitter',
            icon: <FontAwesomeIcon icon={faTwitter} />,
        },
    ];
    const handleSaveBlog = () => {
        if (Object.keys(guest).length > 0) {
            setLoading(true);
            insertSaveBlog(guest.id, blog.id)
                .then((res) => {
                    dispatch(ownData.actions.setSaveBlog(res.data));
                    setLoading(false);
                    toastify('blog saved', 'success');
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
        if (Object.keys(guest).length > 0) {
            setLoading(true);
            deleteSaveBlog(guest.id, blog.id)
                .then((res) => {
                    dispatch(ownData.actions.deleteSaveBlogs(res.data.id));
                    setLoading(false);
                    toastify('blog deleted', 'success');
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
                    {blog.user_id !== guest.id && (
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

                            <Tippy
                                interactive
                                placement="bottom-end"
                                trigger="click"
                                render={(attrs) => {
                                    return (
                                        <div {...attrs}>
                                            <ul className={cx('ellip-list')}>
                                                {ellipData.map((item, index) => {
                                                    return (
                                                        <li className={cx('ellip-item')} key={index}>
                                                            <Button leftIcon={item.icon} key={index}>
                                                                {item.title}
                                                            </Button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    );
                                }}
                            >
                                <span className={cx('icon', 'fa-lg')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </span>
                            </Tippy>
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
                    <span className={cx('blog-info')}>{handleTime(data.updated_at || data.created_at)}</span>
                </div>
            </section>

            {showRegisterModal && (
                <Validate toggle={showRegisterModal} setToggle={setShowRegisterModal} field="Register" />
            )}
        </>
    );
}

export default BlogItem;
