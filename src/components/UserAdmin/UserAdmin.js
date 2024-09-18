import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function UserAdmin() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('user')}>
                <img src={imgs.unsetAvatar} alt="" className={cx('avatar')} />
                <div className={cx('info')}>
                    <p className={cx('name')}>DatLee Thanh</p>
                    <p className={cx('email')}>abc@gmail.com</p>
                </div>
            </div>
            <p className={cx('price')}>300.000 d</p>
        </div>
    );
}

export default UserAdmin;
