import classNames from 'classnames/bind';
import styles from './MyBlogsItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { deleteBlog } from '~/requestApi/requestBlog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { storeData } from '~/redux/reducer/StoreSlice';

const cx = classNames.bind(styles);

function MyBlogsItem({ data }) {
    const dispatch = useDispatch();
    const [showTippy, setShowTippy] = useState(false);
    const handleDelete = () => {
        setShowTippy(false);
        deleteBlog(data.id)
            .then((res) => {
                dispatch(ownData.actions.deleteBlogs(res.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('blog-item')}>
            <h3 className={cx('blog-title')}>{data?.title}</h3>
            <div className={cx('author')}>
                <span className={cx('timer')}>Chinh sua 1 gio truoc</span>
                <span className={cx('dot')}></span>
                <span className={cx('timer')}>1 phut doc</span>
            </div>

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
        </div>
    );
}

export default MyBlogsItem;
