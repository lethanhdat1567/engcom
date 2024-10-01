import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ProfileItem from '~/components/ProfileItem/ProfileItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user.user);

    const InfoData = [
        {
            title: 'Name',
            data: user.name,
        },
        {
            title: 'Email',
            data: user.email,
        },
        {
            title: 'Phone Number',
            data: user.phone_number,
        },
        {
            title: 'Gender',
            data: user.sex,
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Thong tin ca nhan</h2>
            <p className={cx('desc')}>Quan li thong tin ca nhan cua ban</p>
            <div className={cx('cart-wrap')}>
                {InfoData.map((item, index) => {
                    return <ProfileItem data={item} key={index} />;
                })}
            </div>
        </div>
    );
}

export default Profile;
