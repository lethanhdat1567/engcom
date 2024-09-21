import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import imgs from '~/assets/Image';
import InfoUser from './InfoUser';
import ClassItemLarge from '~/components/ClassItemLarge/ClassItemLarge';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('banner')}>
                <div className={cx('user-banner')}>
                    <img className={cx('avatar')} src={imgs.unsetAvatar} />
                    <div className={cx('name')}>Dat Le Thanh</div>
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
