import classNames from 'classnames/bind';
import styles from './AlertCreateModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import imgs from '~/assets/Image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '~/redux/reducer/Toast';

const cx = classNames.bind(styles);

function AlertCreateModal() {
    const dispatch = useDispatch();
    const toastCreateStatus = useSelector((state) => state.toast.toastCreateClass);

    return (
        <div className={cx('modal', { active: toastCreateStatus })}>
            <div className={cx('content')}>
                <span className={cx('x-mart')} onClick={() => dispatch(toast.actions.setToast(false))}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <div className={cx('body')}>
                    <div className={cx('head')}>
                        <span className={cx('alert')}>
                            <FontAwesomeIcon className="fa-xl" icon={faTriangleExclamation} />
                        </span>
                        <span className={cx('head-title')}>Approval process</span>
                    </div>
                    <img src={imgs.thank} className={cx('img')} />
                    <p className={cx('desc')}>
                        Thank you for contributing to our community!
                        <br /> The approval process ensures that all contributions are carefully reviewed
                        before being made public. This helps us maintain the quality and accuracy of our
                        content. You will receive an email notification when your contribution is approved or
                        if we need further information.
                    </p>
                    <div className={cx('footer')}>
                        <Button type="primary" onClick={() => dispatch(toast.actions.setToast(false))}>
                            I got it
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('over-lay')}></div>
        </div>
    );
}

export default AlertCreateModal;
