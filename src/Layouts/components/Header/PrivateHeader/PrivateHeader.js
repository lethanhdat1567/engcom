import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Classes from './Classes';
import HeaderAlert from '~/components/HeaderAlert/HeaderAlert';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';
import Note from '~/components/Note/Note';

const cx = classNames.bind(styles);

function PrivateHeader() {
    return (
        <div className={cx('private-wrap')}>
            <ul className={cx('list')}>
                <Classes />
                <Note />
                <HeaderAlert />
                <ProfileHeader />
            </ul>
        </div>
    );
}

export default PrivateHeader;
