import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import imgs from '~/assets/Image';
import InfoUser from './InfoUser';
import ClassItemLarge from '~/components/ClassItemLarge/ClassItemLarge';
import { useSelector } from 'react-redux';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('wrap')}>
            <div className={cx('banner')}>
                <div className={cx('user-banner')}>
                    <Img
                        className={cx('avatar')}
                        src={
                            user.avatar.includes('googleusercontent.com') ||
                            user.avatar.includes('facebook.com')
                                ? user.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                        }
                        alt="User Avatar"
                    />
                    <div className={cx('name')}>{user.name}</div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className="row">
                    <div className="col col-12 col-lg-4">
                        <InfoUser />
                    </div>
                    <div className="col col-12 col-lg-8">
                        <div className={cx('wrapper')}>
                            <h2 className={cx('info-title')}>Your classes</h2>
                            <ClassItemLarge />
                            <ClassItemLarge />
                            <ClassItemLarge />
                            <ClassItemLarge />
                            <ClassItemLarge />
                            <ClassItemLarge />
                            <ClassItemLarge />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
