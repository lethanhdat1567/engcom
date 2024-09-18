import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import AnalystItem from './AnalystItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import CartItem from '~/components/CartItem';
import CartForm from './CartForm';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TeacherClassHome() {
    const [titleCart, setTitleCart] = useState('');
    const cartItem = {
        title: titleCart,
        icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
        to: '/home',
    };
    const AnaData = [
        {
            title: 'Users',
            icon: <FontAwesomeIcon icon={faUser} className="fa-lg" />,
            total: '16.203',
        },
        {
            title: 'Comments',
            icon: <FontAwesomeIcon icon={faComment} className="fa-lg" />,
            total: '16.203',
        },
        {
            title: 'Total',
            icon: <FontAwesomeIcon icon={faMoneyBill1} className="fa-lg" />,
            total: '16.203$',
        },
    ];
    return (
        <div className={cx('wrap')}>
            <div className="row row-cols-3">
                {AnaData.map((item, index) => {
                    return (
                        <div className="col" key={index}>
                            <AnalystItem item={item} />
                        </div>
                    );
                })}
            </div>
            <div className={cx('cart-wrap')}>
                <h1 className={cx('cart-title')}>Your cart class</h1>
                <div className="row g-5">
                    <div className="col-4">
                        <div className={cx('cart-item')}>
                            <CartItem data={cartItem} />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className={cx('cart-info')}>
                            <CartForm setTitleCart={setTitleCart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherClassHome;
