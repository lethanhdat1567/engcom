import classNames from 'classnames/bind';
import styles from './MyBlogsItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteBlog, deleteSaveBlog } from '~/requestApi/requestBlog';
import { useDispatch, useSelector } from 'react-redux';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { toastify } from '~/utils/toast';
import { handleTime } from '~/utils/handleTime';

const cx = classNames.bind(styles);

function MyBlogsItem({ data, setBlogItems, blogItems, type, deleting, setDeleting }) {
    const guest = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [showTippy, setShowTippy] = useState(false);

    const handleDelete = () => {
        setShowTippy(false);
        deleteBlog(data.id)
            .then((res) => {
                const deletedBlog = res.data;
                const newBlogsData = blogItems.filter((item) => item.id !== deletedBlog.id);
                setBlogItems(newBlogsData);
                toastify('Blog deleted', 'success', 2000, 'top-right');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUnSave = () => {
        if (!deleting) {
            setDeleting(true);
            deleteSaveBlog(guest.id, data.blog_id)
                .then((res) => {
                    dispatch(ownData.actions.deleteSaveBlogs(res.data.id));
                    const newBlogs = blogItems.filter((blog) => {
                        return blog.blog_id !== res.data.blog_id;
                    });
                    setBlogItems(newBlogs);
                    setDeleting(false);
                    toastify('Blog deleted', 'success', 2000, 'top-right');
                })
                .catch((error) => {
                    console.log(error);
                    setDeleting(false);
                });
        }
    };
    console.log(data);

    return (
        <div className={cx('blog-item', { delete: deleting })}>
            <h3 className={cx('blog-title')}>{data?.title}</h3>
            <div className={cx('author')}>
                <span className={cx('timer')}>{handleTime(data?.updated_at)}</span>
            </div>

            {type === 'save' ? (
                <span className={cx('icon', 'fa-lg')} onClick={handleUnSave}>
                    <FontAwesomeIcon icon={faBookmark} />
                </span>
            ) : (
                <Tippy
                    render={(attrs) => (
                        <div {...attrs}>
                            <div className={cx('drop')}>
                                <ul className={cx('drop-list')}>
                                    <li className={cx('drop-item')}>
                                        <Link
                                            to={`${process.env.REACT_APP_ROOT}/post/${data?.id}`}
                                            style={{ width: '100%', height: '100%' }}
                                            className={cx('link')}
                                        >
                                            Chinh sua
                                        </Link>
                                    </li>
                                    <li className={cx('drop-item')} onClick={handleDelete}>
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    placement="bottom-end"
                    visible={showTippy}
                    onClickOutside={() => setShowTippy(false)}
                    interactive
                >
                    <span className={cx('icon')} onClick={() => setShowTippy(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </Tippy>
            )}
        </div>
    );
}

export default MyBlogsItem;
