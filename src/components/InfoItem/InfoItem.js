import classNames from 'classnames/bind';
import styles from './InfoItem.module.scss';
import { Link } from 'react-router-dom';
import Img from '../Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUber } from '@fortawesome/free-brands-svg-icons';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function InfoItem({ data, className, large = false }) {
    return (
        <Link>
            {data.user ? (
                <div className={cx('wrap', className)}>
                    <Img src={`${data?.img}`} className={cx('img', { large })} />
                    <p className={cx('info')}>{data?.user}</p>
                </div>
            ) : (
                <div className={cx('wrap')}>
                    <FontAwesomeIcon icon={(data?.view && faUser) || (data?.comment && faComment)} />
                    <p className={cx('info')}>{data?.view || data?.comment}</p>
                </div>
            )}
        </Link>
    );
}

export default InfoItem;
