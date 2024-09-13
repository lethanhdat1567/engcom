import classNames from 'classnames/bind';
import styles from './InfoItem.module.scss';

const cx = classNames.bind(styles);

function InfoItem({ data, className }) {
    return (
        <div className={cx('wrap', className)}>
            {data.leftIcon && <span className={cx('icon')}>{data.leftIcon}</span>}
            {data.img && <img src={data.img} className={cx('img')} />}
            <p className={cx('info')}>{data.title}</p>
            {data.rightIcon && <span className={cx('icon')}>{data.rightIcon}</span>}
        </div>
    );
}

export default InfoItem;
