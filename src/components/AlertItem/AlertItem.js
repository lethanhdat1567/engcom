import classNames from 'classnames/bind';
import styles from './AlertItem.module.scss';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function AlertItem() {
    return (
        <div className={cx('wrap')}>
            <img className={cx('img')} src={imgs.unsetAvatar} />
            <div className={cx('info-wrap')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>Bai hoc dfaskdsabldkjasbdkjavkjs,vh</h3>
                    <span className={cx('timer')}>3 ngay truoc</span>
                </div>
                <div className={cx('decor')}></div>
            </div>
        </div>
    );
}

export default AlertItem;
