import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AnalystItem({ item }) {
    return (
        <div className={cx('ana-item')}>
            <div className={cx('ana-head')}>
                <span className={cx('ana-icon')}>{item.icon}</span>
                <h2 className={cx('title')}>{item.title}</h2>
            </div>
            <div className={cx('ana-desc')}>
                <span className={cx('ana-main')}>{item.total}</span>
            </div>
        </div>
    );
}

export default AnalystItem;
