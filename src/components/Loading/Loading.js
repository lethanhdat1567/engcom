import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { SyncLoader } from 'react-spinners';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('loading')}>
                <img className={cx('load')} src={imgs.loading} />
                <SyncLoader color="#2B0B7F" size={10} />
            </div>
            <div className={cx('over-lay')}></div>
        </div>
    );
}

export default Loading;
