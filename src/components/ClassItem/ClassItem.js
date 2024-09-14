import classNames from 'classnames/bind';
import styles from './ClassItem.module.scss';
import imgs from '~/assets/Image';
import InfoItem from '../InfoItem/InfoItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ClassItem() {
    const infoData = {
        title: 'Le THanh Dat',
        img: imgs.unsetAvatar,
    };
    return (
        <div className={cx('wrap')}>
            <Link>
                <img className={cx('img')} src={imgs.banner1} />
            </Link>
            <div className={cx('info')}>
                <span className={cx('title')}>HTML CSS PRML CSS PML CSS PML CSS PO</span>
                <InfoItem data={infoData} />
            </div>
        </div>
    );
}

export default ClassItem;
