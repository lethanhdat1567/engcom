import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import AnalystItem from './AnalystItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import CartItem from '~/components/CartItem';
import CartForm from './CartForm';
import { useEffect, useId, useState } from 'react';
import TeacherClassDesign from '../TeacherClassDesign/TeacherClassDesign';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherClassHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.teacher.carts);
    const { slug } = useParams();
    // Data
    const [titleCart, setTitleCart] = useState(cartData.title || '');
    const [cartPrice, setCartPrice] = useState(0);
    const [cartDiscount, setCartDiscount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [descValue, setDescValue] = useState(cartData.desc || '');
    const [cartType, setCartType] = useState('free');
    const [cartThumbnail, setCartThumbnail] = useState(cartData.banner || '');
    const cartId = useId();
    const validateCart = () => {
        return titleCart !== '' && cartThumbnail !== '';
    };

    const states = {
        titleCart,
        setTitleCart,
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
        banner: cartThumbnail,
    };
    useEffect(() => {
        if (cartTotal === 0) {
            setCartType('free');
        } else {
            setCartType('fee');
        }
    }, [cartTotal]);
    const handleSave = () => {
        if (validateCart()) {
            const values = {
                id: cartId,
                title: titleCart,
                price: cartPrice,
                discount: cartDiscount,
                total: cartTotal,
                banner: cartThumbnail,
                desc: descValue,
                type: cartType,
            };
            dispatch(teacher.actions.setCart(values));
            slug ? navigate('/class/1/courses') : navigate('/create-class/courses');
        }
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('cart-wrap')}>
                <div className={cx('head-wrap')}>
                    <h1 className={cx('cart-title')}>Your cart class</h1>
                    <Button disable={validateCart() ? false : true} save onClick={handleSave}>
                        Save
                    </Button>
                </div>
                <div className="row g-5">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className={cx('cart-item')}>
                            <CartItem data={cartItem} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-8">
                        <div className={cx('cart-info')}>
                            <CartForm
                                setCartBanner={setCartThumbnail}
                                cartBanner={cartThumbnail}
                                states={states}
                            />
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
