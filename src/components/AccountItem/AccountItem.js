import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`${process.env.REACT_APP_ROOT}/profile/${data.user_id}`}>
            <div className={cx('wrap')}>
                <img src={handleAvatar(data.img)} className={cx('avatar')} />
                <p className={cx('desc')}>{data.name}</p>
            </div>
        </Link>
    );
}

export default AccountItem;
