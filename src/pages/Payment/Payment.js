import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment() {
    return <div className={cx('wrap')}></div>;
}

export default Payment;
