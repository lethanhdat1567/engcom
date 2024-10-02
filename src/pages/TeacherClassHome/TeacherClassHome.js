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
import { getClasses, getDetailClass } from '~/requestApi/requestClass';
import UpdateLoading from '~/components/Loading/UpdateLoading/UpdateLoading';
import { getCourse } from '~/requestApi/requestCourse';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function TeacherClassHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.teacher.carts);
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    // Data
    const [loading, setLoading] = useState(false);
    const [titleCart, setTitleCart] = useState(cartData?.name || '');
    const [cartPrice, setCartPrice] = useState(cartData?.price || 0);
    const [cartDiscount, setCartDiscount] = useState(cartData?.discount || 0);
    const [cartTotal, setCartTotal] = useState(cartData?.total || 0);
    const [cartPassword, setCartPassword] = useState(cartData?.password || '');
    const [descValue, setDescValue] = useState(cartData?.description || '');
    const [cartType, setCartType] = useState(cartData?.type || '');
    const [cartThumbnail, setCartThumbnail] = useState(cartData?.thumbnail || '');
    const cartId = useId();
    const validateCart = () => {
        return titleCart !== '' && cartType !== null;
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
        cartPassword,
        setCartPassword,
        cartType,
        setCartType,
    };

    const cartItem = {
        class: {
            name: titleCart,
            icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
            price: cartPrice,
            discount: cartDiscount,
            total: cartTotal,
            thumbnail: cartThumbnail,
            type: cartType,
        },
    };
    const handleSave = () => {
        if (validateCart()) {
            const values = {
                id: cartId || '',
                user_id: user.id || '',
                name: titleCart || '',
                price: cartPrice || '',
                discount: cartDiscount || '',
                total: cartTotal || '',
                password: cartPassword || '',
                thumbnail: cartThumbnail || '',
                description: descValue || '',
                type: cartType || '',
            };
            dispatch(teacher.actions.setCart(values));
            slug ? navigate(`/class/${slug}/courses`) : navigate('/create-class/courses');
        }
    };

    useEffect(() => {
        if (cartType === 'public') {
            setCartPrice(0);
            setCartDiscount(0);
            setCartTotal(0);
            setCartPassword('');
        } else if (cartType === 'cost') {
            setCartPassword('');
        } else {
            setCartPrice(0);
            setCartDiscount(0);
            setCartTotal(0);
        }
    }, [cartType]);
    useEffect(() => {
        setTitleCart(cartData.name);
        setCartPrice(cartData.price);
        setCartDiscount(cartData.discount);
        setCartTotal(cartData.total);
        setCartPassword(cartData.password);
        setDescValue(cartData.description);
        setCartType(cartData.type);
        setCartThumbnail(cartData.thumbnail);
    }, [cartData]);
    useEffect(() => {
        if (slug) {
            setLoading(true);
            getDetailClass(slug)
                .then((res) => {
                    const cart = res.data;
                    dispatch(teacher.actions.setCart(cart));
                    getCourse(slug)
                        .then((res) => {
                            dispatch(teacher.actions.setUpdateCourse(res.data.courses));
                            dispatch(teacher.actions.setUpdateLesson(res.data.lessons));
                            dispatch(teacher.actions.setUpdateContent(res.data.content));
                            setLoading(false);
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    return (
        <div className={cx('wrap')}>
            {loading ? (
                <Loading />
            ) : (
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
            )}
        </div>
    );
}

export default TeacherClassHome;
