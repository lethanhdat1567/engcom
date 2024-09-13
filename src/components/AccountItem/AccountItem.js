import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Img from '../Img';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <Link>
            <div className={cx('wrap')}>
                <Img src="" className={cx('avatar')} />
                <p className={cx('desc')}>Xay dung trang web voi ReactJS</p>
            </div>
        </Link>
    );
}

export default AccountItem;
