import classNames from 'classnames/bind';
import styles from './ForgetPasswordForm.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordInput = useRef();
    const handleSubmit = () => {
        console.log(newPassword);
    };

    return (
        <div className={cx('modal-wrap')}>
            <>
                <h4 className={cx('modal-title')}>Update Your Password</h4>
                <p className={cx('modal-desc')}>
                    Please enter your new password below. Make sure it’s strong and secure
                </p>
                <div className={cx('modal-form-group')}>
                    <label className={cx('modal-label')}>New password</label>
                    <div className={cx('modal-input-wrap')}>
                        <input
                            ref={passwordInput}
                            type={showPassword ? 'text' : 'password'}
                            className={cx('modal-input')}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                            className={cx('eye-icon')}
                            onClick={() => {
                                setShowPassword(!showPassword);
                                passwordInput.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>
                <button className={cx('btn')} onSubmit={handleSubmit}>
                    Save
                </button>
            </>
        </div>
    );
}

export default PasswordForm;
