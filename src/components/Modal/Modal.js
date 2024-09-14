import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Modal({ toggle, setToggle, children }) {
    return (
        <div className={cx('modal', { show: toggle })}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <button className={cx('x-mart')} onClick={() => setToggle(false)}>
                    <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;
