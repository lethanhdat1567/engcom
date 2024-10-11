import classNames from 'classnames/bind';
import styles from './ForumItemLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function ForumItemLoading() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('head')}>
                <div className={cx('avatar')}>
                    <Skeleton height={50} />
                </div>
                <div style={{ width: '100%' }}>
                    <Skeleton height={40} width="100%" />
                </div>
            </div>
            <Skeleton height={300} style={{ margin: '10px 0px' }} />
            <Skeleton height={20} />
        </div>
    );
}

export default ForumItemLoading;
