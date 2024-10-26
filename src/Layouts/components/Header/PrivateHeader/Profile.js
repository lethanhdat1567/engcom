import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <li className={cx('item')}>
            <Tippy
                interactive
                trigger="click"
                placement="bottom-end"
                render={(attrs) => (
                    <div {...attrs} className={cx('profile-drop')}>
                        <Link>
                            <div className={cx('profile-info')}>
                                <img className={cx('profile-avatar')} src={imgs.unsetAvatar} />
                                <div className={cx('profile-user')}>
                                    <h2 className={cx('profile-name')}>Le Thanh Dat</h2>
                                    <h2 className={cx('profile-email')}>lethanhdat@gmail.com</h2>
                                </div>
                            </div>
                        </Link>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}>My profile</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}> Write Blogs</Link>
                            </li>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}> My blogs</Link>
                            </li>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}> Saved blogs</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('profile-list')}>
                            <li className={cx('profile-item')}>
                                <Link className={cx('profile-item-link')}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('avatar')}>
                    <img className={cx('avatar-img')} src={imgs.unsetAvatar} />
                </div>
            </Tippy>
        </li>
    );
}

export default Profile;
