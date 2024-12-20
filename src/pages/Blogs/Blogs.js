import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import BlogItem from './BlogItem';
import { useEffect, useState } from 'react';
import { readAllBlogs } from '~/requestApi/requestBlog';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '~/redux/reducer/StoreSlice';
import BlogLoading from '~/components/Loading/BlogLoading/BlogLoading';

const cx = classNames.bind(styles);

function Blogs() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const blogsData = useSelector((state) => state.storeData.blogs);

    useEffect(() => {
        if (blogsData?.length == 0) {
            setLoading(true);
            readAllBlogs()
                .then((res) => {
                    setLoading(false);
                    dispatch(storeData.actions.getBlogs(res.data));
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div className={cx('blogs')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>All blogs</h2>
                <p className={cx('desc')}>
                    Collection of articles sharing experiences in self-studying online and more than that!.
                </p>
                <div className={cx('row row-cols-1 row-cols-lg-2 g-4')}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <div className="col" key={index}>
                                  <BlogLoading />
                              </div>
                          ))
                        : blogsData?.map((item, index) => (
                              <div className={cx('col')} key={index}>
                                  <BlogItem data={item} />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
