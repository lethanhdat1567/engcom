import classNames from 'classnames/bind';
import styles from './AlertModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlertItem from './components/AlertItem/AlertItem';

const cx = classNames.bind(styles);

function AlertModal({ showNav, setShowNav }) {
    const handleClose = () => {
        setShowNav(false);
        localStorage.setItem('ALERT', 'true');
    };
    return (
        <div className={cx('modal', { active: showNav })}>
            <div className={cx('content')}>
                <div className={cx('close-wrap')} onClick={handleClose}>
                    <span className={cx('close-btn')}>
                        <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                    </span>
                </div>
                <div className={cx('body')}>
                    <AlertItem />
                    <AlertItem />
                </div>
            </div>
            <div className={cx('over-lay')}></div>
        </div>
    );
}

export default AlertModal;
