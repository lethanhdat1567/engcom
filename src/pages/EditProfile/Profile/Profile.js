import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ProfileItem from '~/components/ProfileItem/ProfileItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user.user);

    const InfoData = [
        {
            title: 'Avatar',
            type: 'upload',
            name: 'avatar',
            avatar: user.avatar,
        },
        {
            title: 'Name',
            name: 'name',
            data: user.name,
        },
        {
            title: 'Email',
            name: 'email',
            data: user.email,
        },
        {
            title: 'Phone Number',
            name: 'phone_number',
            data: user.phone_number,
        },
        {
            title: 'Address',
            name: 'address',
            data: user.address,
        },
        {
            title: 'Gender',
            name: 'gender',
            type: 'gender',
            gender: user.sex,
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Personal Information.</h2>
            <p className={cx('desc')}>Manage your personal information.</p>
            <div className={cx('cart-wrap')}>
                {InfoData.map((item, index) => {
                    return <ProfileItem data={item} key={index} />;
                })}
            </div>
        </div>
    );
}

export default Profile;
