import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Classes from './Classes';
import HeaderAlert from '~/components/HeaderAlert/HeaderAlert';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';

const cx = classNames.bind(styles);

function PrivateHeader() {
    return (
        <div className={cx('private-wrap')}>
            <ul className={cx('list')}>
                <Classes />
                <HeaderAlert />
                <ProfileHeader />
            </ul>
        </div>
    );
}

export default PrivateHeader;
