import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import BlogItem from './BlogItem';

const cx = classNames.bind(styles);

function Blogs() {
    return (
        <div className={cx('blogs')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>All blogs</h2>
                <p className={cx('desc')}>
                    Collection of articles sharing experiences in self-studying english online and more than
                    that!.
                </p>
                <div className={cx('row row-cols-2 g-4')}>
                    <div className={cx('col')}>
                        <BlogItem />
                    </div>
                    <div className={cx('col')}>
                        <BlogItem />
                    </div>
                    <div className={cx('col')}>
                        <BlogItem />
                    </div>
                    <div className={cx('col')}>
                        <BlogItem />
                    </div>
                    <div className={cx('col')}>
                        <BlogItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
