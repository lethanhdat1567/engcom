import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import priceTrander from '~/utils/priceTranfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function InfoCart({ data }) {
    return (
        <>
            {data.type === 'cost' && (
                <div className={cx('cost')}>
                    {data.discount > 0 && <p className={cx('price')}>{priceTrander(data.price)}</p>}
                    <p className={cx('total', { sale: data.discount > 0 })}>{priceTrander(data.total)}</p>
                </div>
            )}
            {data.type === 'public' && (
                <div className={cx('cost')}>
                    <span>
                        <FontAwesomeIcon className="fa-sm" icon={faUsers} style={{ color: '#f05123' }} />
                    </span>
                    <p className={cx('free', { sale: data.discount > 0 })}>Free class</p>
                </div>
            )}
            {data.type === 'private' && (
                <div className={cx('cost')}>
                    <span>
                        <FontAwesomeIcon className="fa-sm" icon={faLock} style={{ color: '#4f4e4e' }} />
                    </span>
                    <p className={cx('private', { sale: data.discount > 0 })}>Private class</p>
                </div>
            )}
        </>
    );
}

export default InfoCart;
