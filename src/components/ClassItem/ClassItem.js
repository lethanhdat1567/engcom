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
            <Link to={`${process.env.REACT_APP_ROOT}/course/1`}>
                <img className={cx('img')} src={imgs.banner1} />
            </Link>
            <div className={cx('info')}>
                <Link to={`${process.env.REACT_APP_ROOT}/course/1`}>
                    <span className={cx('title')}>HTML CSS PRML CSS PML CSS PML CSS PO</span>
                </Link>
                <InfoItem data={infoData} />
                <div className={cx('process')}>
                    <div
                        style={{
                            height: '100%',
                            width: '50%',
                            background: '#f05123',
                            transition: 'ease 0.4s',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ClassItem;
