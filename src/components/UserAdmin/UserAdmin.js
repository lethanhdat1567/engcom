import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import UserRole from '../UserRole/UserRole';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function UserAdmin({ data }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('user')}>
                <img src={handleAvatar(data.avatar)} alt="" className={cx('avatar')} />
                <div className={cx('info')}>
                    <p className={cx('name')}>{data.name}</p>
                    <div className={cx('email')}>
                        <UserRole type={data.role_id} />
                    </div>
                </div>
            </div>
            <p className={cx('price')}>{data.rank_count} classes</p>
        </div>
    );
}

export default UserAdmin;
