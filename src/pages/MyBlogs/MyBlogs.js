import classNames from 'classnames/bind';
import styles from './MyBlogs.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readListBlog } from '~/requestApi/requestBlog';
import { useSelector } from 'react-redux';
import MyBlogsItem from '~/components/MyBlogsItem/MyBlogsItem';

const cx = classNames.bind(styles);

function MyBlogs() {
    const [blogItems, setBlogItems] = useState([]);
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        readListBlog(user.id)
            .then((res) => {
                setBlogItems([...blogItems, ...res.data]);
            })
            .catch((error) => console.log(error));
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
                                    <Link className={cx('item-link')}>Ban nhap</Link>
                                </li>
                            </ul>
                            <div className={cx('seperate')}></div>
                        </div>
                        <div className={cx('blog-wrap')}>
                            {blogItems.map((item, index) => {
                                return <MyBlogsItem data={item} key={index} />;
                            })}
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">sdsd</div>
                </div>
            </div>
        </div>
    );
}

export default MyBlogs;
