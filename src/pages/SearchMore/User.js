import classNames from 'classnames/bind';
import styles from './SearchMore.module.scss';
import Img from '~/components/Img';
import UserRole from '~/components/UserRole/UserRole';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function User({ userData }) {
    if (userData) {
        if (userData.children?.length > 0) {
            return (
                <div className={cx('user-wrap')}>
                    {userData?.children?.map((item, index) => {
                        return (
                            <Link
                                className={cx('user')}
                                key={index}
                                to={`${process.env.REACT_APP_ROOT}/profile/${item.user_id}`}
                            >
                                <Img
                                    className={cx('user-avatar')}
                                    src={
                                        item.img?.includes('googleusercontent.com') ||
                                        item.img?.includes('facebook.com')
                                            ? item.img
                                            : `${process.env.REACT_APP_BACKEND_UPLOAD}/${item.img}`
                                    }
                                    alt="User Avatar"
                                />
                                <div className={cx('user-info')}>
                                    <h3 className={cx('user-name')}>{item.name}</h3>
                                    <UserRole type={item.type} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            );
        } else {
            return <div className={cx('not-found')}>Not found {userData.type}</div>;
        }
    }
}

export default User;
