import classNames from 'classnames/bind';
import styles from './BlogLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function BlogDetailLoading() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('title')}>
                <Skeleton height={60} />
            </div>
            <div className={cx('banner')}>
                <Skeleton height={300} />
            </div>
            <div className={cx('content')}>
                <Skeleton height={16} count={7} style={{ margin: '10px 0px' }} />
            </div>
        </div>
    );
}

export default BlogDetailLoading;
