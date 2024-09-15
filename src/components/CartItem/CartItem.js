import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import priceTrander from '~/utils/priceTranfer';
import InfoItem from '../InfoItem/InfoItem';

const cx = classNames.bind(styles);

function CartItem({ data, type, cost }) {
    return (
        <div className={cx('wrap')}>
            <Link className={cx('banner')}>
                <img
                    src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                    className={cx('img')}
                />
            </Link>
            <div className={cx('info')}>
                <h3 className={cx('title')}>HTML CSS PRO</h3>
                {type === 'cart' && cost === 'cost' && (
                    <div className={cx('cost')}>
                        <p className={cx('price')}>{priceTrander(10)}</p>
                        <p className={cx('total')}>{priceTrander(5)}</p>
                    </div>
                )}
                <div className={cx('footer')}>
                    {data.map((item, index) => {
                        return <InfoItem data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
