import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Classes from './Classes';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';
import Note from '~/components/Note/Note';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function PrivateHeader() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('private-wrap')}>
            <ul className={cx('list')}>
                {user.role_id == 2 && <Classes />}
                <Note />
                <ProfileHeader />
            </ul>
        </div>
    );
}

export default PrivateHeader;
