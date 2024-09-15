import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function InfoUser() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('info-title')}>Gioi thieu</h2>
            <ul className={cx('info-list')}>
                <li className={cx('info-item')}>
                    <span className={cx('info-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('desc-info')}>
                        Thành viên của F8 - Học lập trình để đi làm từ 7 tháng trước
                    </p>
                </li>
                <li className={cx('info-item')}>
                    <span className={cx('info-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('desc-info')}>
                        Thành viên của F8 - Học lập trình để đi làm từ 7 tháng trước
                    </p>
                </li>
                <li className={cx('info-item')}>
                    <span className={cx('info-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('desc-info')}>
                        Thành viên của F8 - Học lập trình để đi làm từ 7 tháng trước
                    </p>
                </li>
                <li className={cx('info-item')}>
                    <span className={cx('info-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('desc-info')}>
                        Thành viên của F8 - Học lập trình để đi làm từ 7 tháng trước
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default InfoUser;
