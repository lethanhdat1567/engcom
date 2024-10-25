import classNames from 'classnames/bind';
import styles from './ForgetPasswordForm.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { errorIcon } from '~/assets/Icon';
import { resetPasswordCode } from '~/requestApi/requestForgetPassword';
import Validate from '../Validate';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function PasswordForm({ data, setShowForgot }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const passwordInput = useRef();

    const handleSubmit = () => {
        if (newPassword.trim() && confirmPassword.trim()) {
            if (newPassword === confirmPassword) {
                const values = {
                    password: newPassword,
                    password_confirmation: confirmPassword,
                    token: data,
                };
                setLoading(true);
                resetPasswordCode(values)
                    .then((res) => {
                        setShowForgot(false);
                        setLoading(false);
                        toastify('Change password success', 'success', 2000, 'top-right');
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
                setErrorMessage(null);
            } else {
                setErrorMessage('Passwords do not match!');
            }
        } else {
            setErrorMessage('Both fields are required!');
        }
    };
    return (
        <>
            <div className={cx('modal-wrap')}>
                <>
                    <h4 className={cx('modal-title')}>Update Your Password</h4>
                    <p className={cx('modal-desc')}>
                        Please enter your new password below. Make sure it’s strong and secure.
                    </p>
                    <div className={cx('modal-form-group')}>
                        <label className={cx('modal-label')}>New password</label>
                        <div className={cx('modal-input-wrap', { error: errorMessage })}>
                            <input
                                ref={passwordInput}
                                type={showPassword ? 'text' : 'password'}
                                className={cx('modal-input')}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setErrorMessage();
                                }}
                            />

                            {errorMessage ? (
                                <span className={cx('error-shake')}>{errorIcon}</span>
                            ) : (
                                <span
                                    className={cx('eye-icon')}
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                        passwordInput.current.focus();
                                    }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('modal-form-group')}>
                        <label className={cx('modal-label')}>Confirm new password</label>
                        <div className={cx('modal-input-wrap', { error: errorMessage })}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={cx('modal-input')}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrorMessage();
                                }}
                            />

                            {errorMessage ? (
                                <span className={cx('error-shake')}>{errorIcon}</span>
                            ) : (
                                <span
                                    className={cx('eye-icon')}
                                    onClick={() => {
                                        setShowConfirmPassword(!showConfirmPassword);
                                    }}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </span>
                            )}
                        </div>
                    </div>
                    {errorMessage && (
                        <div className={cx('error-message')}>
                            <span>
                                <FontAwesomeIcon icon={faXmarkCircle} style={{ color: 'red' }} />
                            </span>
                            {errorMessage}
                        </div>
                    )}
                    <button className={cx('btn')} onClick={handleSubmit}>
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                        ) : (
                            'Reset password'
                        )}
                    </button>
                </>
            </div>
        </>
    );
}

export default PasswordForm;
