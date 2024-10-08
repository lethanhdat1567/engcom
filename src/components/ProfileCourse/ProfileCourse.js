import classNames from 'classnames/bind';
import styles from './ProfileCourse.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProfileCourse() {
    return (
        <div className={cx('wrap')}>
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
                                    <Link
                                        to={`${process.env.REACT_APP_ROOT}/profile`}
                                        className={cx('profile-item-link')}
                                    >
                                        Trang ca nhan
                                    </Link>
                                </li>
                            </ul>
                            <hr />
                            <ul className={cx('profile-list')}>
                                <li className={cx('profile-item')}>
                                    <Link
                                        to={`${process.env.REACT_APP_ROOT}/new-post`}
                                        className={cx('profile-item-link')}
                                    >
                                        Viet Blogs
                                    </Link>
                                </li>
                                <li className={cx('profile-item')}>
                                    <Link
                                        to={`${process.env.REACT_APP_ROOT}/me/post`}
                                        className={cx('profile-item-link')}
                                    >
                                        Bai viet cua toi
                                    </Link>
                                </li>
                                <li className={cx('profile-item')}>
                                    <Link
                                        to={`${process.env.REACT_APP_ROOT}/me/bookmark`}
                                        className={cx('profile-item-link')}
                                    >
                                        Bai viet da luu
                                    </Link>
                                </li>
                            </ul>
                            <hr />
                            <ul className={cx('profile-list')}>
                                <li className={cx('profile-item')}>
                                    <Link className={cx('profile-item-link')}>Cai dat</Link>
                                </li>
                                <li className={cx('profile-item')}>
                                    <Link className={cx('profile-item-link')}>Dang xuat</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div className={cx('avatar')}>
                        <img className={cx('avatar-img')} src={imgs.unsetAvatar} />
                        <div className={cx('info')}>
                            <h3 className={cx('info-name')}>Le Thanh Dat</h3>
                            <span className={cx('icon-info')}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </div>
                    </div>
                </Tippy>
            </li>
        </div>
    );
}

export default ProfileCourse;
