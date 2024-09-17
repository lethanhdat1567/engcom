import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import priceTrander from '~/utils/priceTranfer';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    const infoData = [
        {
            title: 'Le Thanh Dat',
            img: imgs.unsetAvatar,
        },
        {
            title: '16.000',
            leftIcon: <FontAwesomeIcon icon={faUsers} />,
        },
        {
            title: '5',
            leftIcon: <FontAwesomeIcon icon={faBook} />,
        },
    ];
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/class/1`} className={cx('banner')}>
                <img src={imgs.cartImg} className={cx('img')} />
            </Link>
            <div className={cx('info')}>
                <Link to={`${process.env.REACT_APP_ROOT}/class/1`}>
                    <h3 className={cx('title')}>HTML CSS PRO</h3>
                </Link>
                {data.total > 0 && (
                    <div className={cx('cost')}>
                        <p className={cx('price')}>{priceTrander(10)}</p>
                        <p className={cx('total')}>{priceTrander(5)}</p>
                    </div>
                )}
                <div className={cx('footer')}>
                    {infoData.map((item, index) => {
                        return <InfoItem data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
