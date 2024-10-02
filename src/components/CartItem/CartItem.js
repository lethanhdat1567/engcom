import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import priceTrander from '~/utils/priceTranfer';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { useState } from 'react';
import Validate from '~/pages/Validate';
import { useSelector } from 'react-redux';
import InfoCart from './InfoCart';

const cx = classNames.bind(styles);

function CartItem({ data, create = false }) {
    const user = useSelector((state) => state.user.user);
    const [regisModal, setRegisModal] = useState(false);
    const cartItem = data.class;
    const cartInfo = data?.info;
    const handleOpenModal = () => {
        if (!user.role_id) {
            setRegisModal(true);
        }
    };
    if (cartItem) {
        return (
            <>
                <div className={cx('wrap')} onClick={handleOpenModal}>
                    <Link
                        to={
                            cartItem.id && create
                                ? `${process.env.REACT_APP_ROOT}/own/${cartItem.id}`
                                : `${process.env.REACT_APP_ROOT}/class/${cartItem.id}`
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
                    </div>
                </div>
                {regisModal && <Validate toggle={regisModal} setToggle={setRegisModal} field="Register" />}
            </>
        );
    }
}

export default CartItem;
