import classNames from 'classnames/bind';
import styles from './TeachderHome.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function EmptyCart() {
    return (
        <Link to={`${process.env.REACT_APP_ROOT}/create-class`}>
            <div className={cx('empty-cart')}>
                <div className={cx('info')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </span>
                    <span className={cx('cart-title')}>Create your cart</span>
                </div>
            </div>
        </Link>
    );
}

export default EmptyCart;
