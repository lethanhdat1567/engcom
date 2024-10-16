import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import CartItem from '~/components/CartItem';
import CartForm from './CartForm';
import { useEffect, useId, useState } from 'react';
import TeacherClassDesign from '../TeacherClassDesign/TeacherClassDesign';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailClass, updateClass } from '~/requestApi/requestClass';
import { getCourse } from '~/requestApi/requestCourse';
import Loading from '~/components/Loading/Loading';
import { toastify } from '~/utils/toast';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function TeacherClassHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.teacher.carts);
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [titleCart, setTitleCart] = useState(cartData?.name || '');
    const [cartPassword, setCartPassword] = useState(cartData?.password || '');
    const [descValue, setDescValue] = useState(cartData?.description || '');
    const [cartType, setCartType] = useState(cartData?.type || '');
    const [cartThumbnail, setCartThumbnail] = useState(cartData?.thumbnail || '');
    const [cartSubject, setCartSubject] = useState(cartData?.subject || '');
    const [showTippy, setShowTippy] = useState(true);
    const cartId = useId();
    const validateCart = () => {
        if (titleCart && cartType) {
            return true;
        }
        return false;
    };

    const states = {
        titleCart,
        setTitleCart,
        cartPassword,
        setCartPassword,
        cartType,
        setCartType,
        cartSubject,
        setCartSubject,
    };
    const cartItem = {
        class: {
            name: titleCart,
            icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
            thumbnail: cartThumbnail,
            type: cartType,
            subject: cartSubject,
        },
    };
    const handleSave = () => {
        if (validateCart()) {
            if (slug) {
                setLoading(true);
                const values = {
                    user_id: user.id,
                    name: titleCart,
                    description: descValue,
                    password: cartPassword,
                    thumbnail: cartThumbnail,
                    type: cartType,
                    subject: cartSubject,
                };
                updateClass(values, slug)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        toastify('Update class success', 'success', 2000, 'top-right');
                    })
                    .catch((error) => {
                        setLoading(false);
                        toastify('Update class success', 'success', 2000, 'top-right');
                    });
            } else {
                const values = {
                    id: cartId || '',
                    user_id: user.id || '',
                    name: titleCart || '',
                    password: cartPassword || '',
                    thumbnail: cartThumbnail || '',
                    description: descValue || '',
                    type: cartType || '',
                    subject: cartSubject || '',
                };
                dispatch(teacher.actions.setCart(values));
                slug ? navigate(`/own/${slug}/courses`) : navigate('/create-class/courses');
            }
        }
    };

    useEffect(() => {
        if (cartType === 'public') {
            setCartPassword('');
        }
    }, [cartType]);
    useEffect(() => {
        setTitleCart(cartData.name);
        setCartPassword(cartData.password);
        setDescValue(cartData.description);
        setCartType(cartData.type);
        setCartThumbnail(cartData.thumbnail);
        setCartSubject(cartData.subject);
    }, [cartData]);
    useEffect(() => {
        if (slug && Object.keys(cartData).length === 0) {
            setLoading(true);
            getDetailClass(slug)
                .then((res) => {
                    const cart = res.data.class;
                    dispatch(teacher.actions.setCart(cart));
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
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
                        <Tippy
                            visible={showTippy}
                            onClickOutside={() => setShowTippy(false)}
                            content="remember to save here :)"
                            placement="bottom"
                        >
                            <span>
                                <Button disable={!validateCart()} save onClick={handleSave}>
                                    {slug ? 'Update' : 'Save'}
                                </Button>
                            </span>
                        </Tippy>
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
