import classNames from 'classnames/bind';
import styles from './Bookmark.module.scss';
import { Link } from 'react-router-dom';
import MyBlogsItem from '~/components/MyBlogsItem/MyBlogsItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSaveBlog } from '~/requestApi/requestBlog';
import SkeletonLoading from '~/components/Loading/SkeletonLoading';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Bookmark() {
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [saveBlogs, setSaveBlogs] = useState([]);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSaveBlog(user.id)
            .then((res) => {
                setLoading(false);
                setSaveBlogs(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h1 className={cx('title')}>Blogs saved</h1>
            </div>
            <div className={cx('body')}>
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <div className={cx('list-wrap')}>
                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <Link className={cx('item-link')}>Saved blog posts.</Link>
                                </li>
                            </ul>
                            <div className={cx('seperate')}></div>
                            <div className={cx('blog-wrap')}>
                                {loading ? (
                                    <SkeletonLoading height={100} margin={10} count={3} />
                                ) : (
                                    saveBlogs.map((item, index) => {
                                        return (
                                            <MyBlogsItem
                                                setBlogItems={setSaveBlogs}
                                                blogItems={saveBlogs}
                                                type={'save'}
                                                data={item}
                                                key={index}
                                                deleting={deleting}
                                                setDeleting={setDeleting}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 d-none d-lg-block">
                        <img className={cx('promotion')} src={imgs.blog1} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookmark;
