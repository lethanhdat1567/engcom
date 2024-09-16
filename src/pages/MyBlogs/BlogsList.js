import classNames from 'classnames/bind';
import styles from './MyBlogs.module.scss';
import MyBlogsItem from '~/components/MyBlogsItem/MyBlogsItem';

const cx = classNames.bind(styles);

function BlogsList() {
    return (
        <div className={cx('blog-wrap')}>
            <MyBlogsItem />
            <MyBlogsItem />
            <MyBlogsItem />
            <MyBlogsItem />
            <MyBlogsItem />
        </div>
    );
}

export default BlogsList;
