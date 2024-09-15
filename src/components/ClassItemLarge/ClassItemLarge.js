import classNames from 'classnames/bind';
import styles from './ClassItemLarge.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ClassItemLarge() {
    const infoItem = {
        title: 'Le THanh Dat',
        img: imgs.unsetAvatar,
    };
    return (
        <div className={cx('wrap')}>
            <Link className={cx('img-link')}>
                <img className={cx('img')} src={imgs.profileBanner} />
            </Link>
            <div className={cx('info')}>
                <div className={cx('wrap-info')}>
                    <h2 className={cx('title')}>
                        <Link>Javascript pro</Link>
                    </h2>
                    <p className={cx('desc')}>
                        Từ cơ bản tới chuyên sâu, thực hành 8 dự án, hàng trăm bài tập, trang hỏi đáp riêng,
                        cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                    </p>
                </div>
                <InfoItem data={infoItem} />
            </div>
        </div>
    );
}

export default ClassItemLarge;
