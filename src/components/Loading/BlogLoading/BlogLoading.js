import classNames from 'classnames/bind';
import styles from './BlogLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function BlogLoading() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('head')}>
                <div className={cx('info')}>
                    <Skeleton height={20} />
                </div>
                <div className={cx('user')}>
                    <Skeleton height={20} />
                </div>
            </div>
            <div className={cx('img')}>
                <Skeleton height={200} />
            </div>
        </div>
    );
}

export default BlogLoading;
