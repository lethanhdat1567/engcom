import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import priceTrander from '~/utils/priceTranfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faComputer, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function InfoCart({ data }) {
    return (
        <div className={cx('info-wrap')}>
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
            <div className={cx('info-type-wrap')}>
                <img src={imgs.typeClassEnglish} className={cx('info-img')} />
            </div>
        </div>
    );
}

export default InfoCart;
