import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '~/components/Logo/Logo';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';

const cx = classNames.bind(styles);

function HeaderAdmin() {
    // Data
    const items = [
        {
            key: '1',
            label: <Link className={cx('alert-item')}>Setting</Link>,
        },
        {
            key: '2',
            label: <Link className={cx('alert-item')}>Logout</Link>,
        },
    ];

    const dropdownAlert = () => {
        return (
            <div className={cx('alert-dropdown')}>
                <h3 className={cx('head')}>Your notification</h3>
            </div>
        );
    };

    return (
        <div className={cx('admin')}>
            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <div className={cx('logo-wrap')}>
                        <Logo white />
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('user-wrap')}>
                        <Space direction="vertical">
                            <Space wrap size={'large'}>
                                <Dropdown
                                    trigger="click"
                                    dropdownRender={dropdownAlert}
                                    placement="bottom"
                                    arrow
                                >
                                    <FontAwesomeIcon icon={faBell} className={cx('icon', 'fa-xl')} />
                                </Dropdown>
                            </Space>
                        </Space>
                        <ProfileCourse />
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown trigger="click" menu={{ items }} placement="">
                                    <FontAwesomeIcon icon={faGear} className={cx('icon', 'fa-xl')} />
                                </Dropdown>
                            </Space>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;
