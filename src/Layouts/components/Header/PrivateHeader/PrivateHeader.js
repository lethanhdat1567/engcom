import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import imgs from '~/assets/Image';
import Classes from './Classes';
import Alert from './Alert';
import Profile from './Profile';

const cx = classNames.bind(styles);

function PrivateHeader() {
    return (
        <div className={cx('private-wrap')}>
            <ul className={cx('list')}>
                <Classes />
                <Alert />
                <Profile />
            </ul>
        </div>
    );
}

export default PrivateHeader;
