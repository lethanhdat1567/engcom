import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLocationDot,
    faPhone,
    faPlus,
    faUser,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function InfoUser({ info }) {
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);

    const InfoData = [
        {
            title: 'Email',
            data: user.email,
            icon: faEnvelope,
        },
        {
            title: 'Phone number',
            data: user.phone_number,
            icon: faPhone,
        },
        {
            title: 'Address',
            data: user.address,
            icon: faLocationDot,
        },
        {
            title: 'Gender',
            data: user.sex,
            icon: faVenusMars,
        },
    ];

    const InfoDataPublic = [
        {
            title: 'Email',
            data: info?.email,
            icon: faEnvelope,
        },
        {
            title: 'Phone number',
            data: info?.phone_number,
            icon: faPhone,
        },
        {
            title: 'Address',
            data: info?.address,
            icon: faLocationDot,
        },
        {
            title: 'Gender',
            data: info?.sex,
            icon: faVenusMars,
        },
    ];

    if (slug) {
        return (
            <div className={cx('wrapper')}>
                <h2 className={cx('info-title')}>Gioi thieu</h2>
                <ul className={cx('info-list')}>
                    {InfoDataPublic.map((item, index) => {
                        return (
                            <li className={cx('info-item')} key={index}>
                                <div className={cx('head')}>
                                    <span className={cx('info-icon')}>
                                        <FontAwesomeIcon icon={item.icon} className={cx('icon')} />:
                                    </span>
                                    {item.data ? (
                                        <p className={cx('desc-info')}>{item.data}</p>
                                    ) : (
                                        <span className={cx('unset')}>information not yet added</span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <h2 className={cx('info-title')}>Gioi thieu</h2>
                <ul className={cx('info-list')}>
                    {InfoData.map((item, index) => {
                        return (
                            <li className={cx('info-item')} key={index}>
                                <div className={cx('head')}>
                                    <span className={cx('info-icon')}>
                                        <FontAwesomeIcon icon={item.icon} className={cx('icon')} />:
                                    </span>
                                    {item.data ? (
                                        <p className={cx('desc-info')}>{item.data}</p>
                                    ) : (
                                        <span className={cx('unset')}>information not yet added</span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                    <li className={cx('info-item')}>
                        <Link to={`${process.env.REACT_APP_ROOT}/edit-profile`} className={cx('info-edit')}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span className={cx('info-edit-title')}>Edit your profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default InfoUser;
