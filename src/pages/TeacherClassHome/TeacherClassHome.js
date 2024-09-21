import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import AnalystItem from './AnalystItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import CartItem from '~/components/CartItem';
import CartForm from './CartForm';
import { useEffect, useState } from 'react';
import TeacherClassDesign from '../TeacherClassDesign/TeacherClassDesign';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function TeacherClassHome() {
    // Data
    const [titleCart, setTitleCart] = useState('');
    const [cartPrice, setCartPrice] = useState(0);
    const [cartDiscount, setCartDiscount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartBanner, setCartBanner] = useState('');
    const [descValue, setDescValue] = useState('ALo alo');

    const states = {
        titleCart,
        setTitleCart,
        cartBanner,
        setCartBanner,
        cartPrice,
        setCartPrice,
        cartDiscount,
        setCartDiscount,
        cartTotal,
        setCartTotal,
    };

    const cartItem = {
        title: titleCart,
        icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
        price: cartPrice,
        total: cartTotal,
        to: '/home',
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('cart-wrap')}>
                <div className={cx('head-wrap')}>
                    <h1 className={cx('cart-title')}>Your cart class</h1>
                    <Button save>Save</Button>
                </div>
                <div className="row g-5">
                    <div className="col-4">
                        <div className={cx('cart-item')}>
                            <CartItem data={cartItem} />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className={cx('cart-info')}>
                            <CartForm states={states} />
                        </div>
                    </div>
                </div>
                <div className={cx('desc')}>
                    <TeacherClassDesign states={{ descValue, setDescValue }} />
                </div>
            </div>
        </div>
    );
}

export default TeacherClassHome;
