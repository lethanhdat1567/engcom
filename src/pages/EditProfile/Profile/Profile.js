import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ProfileItem from '~/components/ProfileItem/ProfileItem';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Thong tin ca nhan</h2>
            <p className={cx('desc')}>Quan li thong tin ca nhan cua ban</p>
            <div className={cx('cart-wrap')}>
                <ProfileItem />
                <ProfileItem />
                <ProfileItem />
                <ProfileItem />
            </div>
        </div>
    );
}

export default Profile;
