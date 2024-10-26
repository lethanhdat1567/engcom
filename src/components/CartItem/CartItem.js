import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { useDispatch } from 'react-redux';
import InfoCart from './InfoCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import { toast } from '~/redux/reducer/Toast';

const cx = classNames.bind(styles);

function CartItem({ data, create = false }) {
    const dispatch = useDispatch();
    const cartItem = data.class;
    const cartInfo = data?.info;

    if (cartItem) {
        return (
            <>
                <div className={cx('wrap', { teacher: cartItem.id && create })}>
                    <Link
                        to={
                            cartItem.id &&
                            (create
                                ? `${process.env.REACT_APP_ROOT}/own/${cartItem.id}`
                                : `${process.env.REACT_APP_ROOT}/class/${cartItem.id}`)
                        }
                        className={cx('banner')}
                    >
                        <img
                            src={
                                cartItem.thumbnail
                                    ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${cartItem.thumbnail}`
                                    : imgs.NoImg
                            }
                            className={cx('img')}
                        />
                    </Link>
                    <div className={cx('info')}>
                        <Link to={cartItem.id && `${process.env.REACT_APP_ROOT}/class/${cartItem.id}`}>
                            <h3 className={cx('title')}>{cartItem.name}</h3>
                        </Link>
                        <InfoCart data={cartItem} />
                        <div className={cx('footer')}>
                            {cartInfo?.map((item, index) => {
                                return <InfoItem data={item} key={index} />;
                            })}
                        </div>
                        {cartItem.id && create && cartItem.deleted === null && (
                            <div className={cx('alert-app')}>
                                <span className={cx('alert-desc')}>pending approval...</span>
                                <Tippy content="More detail">
                                    <span
                                        className={cx('alert-icon')}
                                        onClick={() => dispatch(toast.actions.setToast(true))}
                                    >
                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                    </span>
                                </Tippy>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default CartItem;
