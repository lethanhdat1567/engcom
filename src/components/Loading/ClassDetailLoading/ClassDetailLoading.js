import classNames from 'classnames/bind';
import styles from './ClassDetailLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function ClassDetailLoading() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('row', 'd-lg-flex', 'flex-column-reverse', 'flex-lg-row')}>
                <div className={cx('col col-12 col-lg-8')}>
                    <Skeleton count={18} height={20} style={{ margin: '10px 0' }} />
                </div>
                <div className={cx('col col-12 col-lg-4')}>
                    <Skeleton height={200} count={1} />
                    <Skeleton count={6} height={20} style={{ margin: '10px 0' }} />
                </div>
            </div>
        </div>
    );
}

export default ClassDetailLoading;
