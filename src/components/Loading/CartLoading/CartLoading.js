import classNames from 'classnames/bind';
import styles from './CartLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function CartLoading() {
    return (
        <div className={cx('wrap')}>
            <Skeleton height={160} />
            <Skeleton count={5} height={10} />
        </div>
    );
}

export default CartLoading;
