import classNames from 'classnames/bind';
import styles from './ClassCart.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ClassCart({ data }) {
    const infoData = [
        {
            title: 'Le Thanh Dat',
        },
    ];
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/course/1`} className={cx('banner')}>
                <img src={imgs.cartImg} className={cx('img')} />
            </Link>
            <div className={cx('info')}>
                <Link to={`${process.env.REACT_APP_ROOT}/course/1`}>
                    <h3 className={cx('title')}>HTML CSS PRO</h3>
                </Link>
                <div className={cx('footer')}>
                    {infoData.map((item, index) => {
                        return <InfoItem data={item} key={index} />;
                    })}
                </div>
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

export default ClassCart;
