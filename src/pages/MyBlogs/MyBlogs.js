import classNames from 'classnames/bind';
import styles from './MyBlogs.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readListBlog } from '~/requestApi/requestBlog';
import { useSelector } from 'react-redux';
import MyBlogsItem from '~/components/MyBlogsItem/MyBlogsItem';
import SkeletonLoading from '~/components/Loading/SkeletonLoading';

const cx = classNames.bind(styles);

function MyBlogs() {
    const [blogItems, setBlogItems] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        readListBlog(user.id)
            .then((res) => {
                setBlogItems(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h1 className={cx('title')}>My BLogs</h1>
            </div>
            <div className={cx('body')}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className={cx('list-wrap')}>
                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <Link className={cx('item-link')}>Written blogs post.</Link>
                                </li>
                            </ul>
                            <div className={cx('seperate')}></div>
                        </div>
                        <div className={cx('blog-wrap')}>
                            {loading ? (
                                <SkeletonLoading height={100} margin={10} count={3} />
                            ) : (
                                blogItems?.map((item, index) => {
                                    return (
                                        <MyBlogsItem
                                            setBlogItems={setBlogItems}
                                            blogItems={blogItems}
                                            data={item}
                                            key={index}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-none d-lg-block">sdsd</div>
                </div>
            </div>
        </div>
    );
}

export default MyBlogs;
