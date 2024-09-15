import classNames from 'classnames/bind';
import styles from './InfoItem.module.scss';
import { Link } from 'react-router-dom';
import Img from '../Img';

const cx = classNames.bind(styles);

function InfoItem({ data, className, large = false }) {
    return (
        <Link>
            <div className={cx('wrap', className)}>
                <Img src={`${data?.img}`} className={cx('img', { large })} />
                <p className={cx('info')}>{data?.title}</p>
            </div>
        </Link>
    );
}

export default InfoItem;
