import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import priceTrander from '~/utils/priceTranfer';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/class/1`} className={cx('banner')}>
                <img src={imgs.cartImg || imgs.NoImg} className={cx('img')} />
            </Link>
            <div className={cx('info')}>
                <Link to={`${process.env.REACT_APP_ROOT}/class/1`}>
                    <h3 className={cx('title')}>{data.title}</h3>
                </Link>
                {data.total > 0 && (
                    <div className={cx('cost')}>
                        <p className={cx('price')}>{priceTrander(data.price)}</p>
                        <p className={cx('total')}>{priceTrander(data.total)}</p>
                    </div>
                )}
                <div className={cx('footer')}>
                    {data?.info?.map((item, index) => {
                        return <InfoItem data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
