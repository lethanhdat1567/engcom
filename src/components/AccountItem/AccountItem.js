import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Img from '../Img';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={'/profile'}>
            <div className={cx('wrap')}>
                <Img src={data.banner || ''} className={cx('avatar')} />
                <p className={cx('desc')}>{data.name}</p>
            </div>
        </Link>
    );
}

export default AccountItem;
