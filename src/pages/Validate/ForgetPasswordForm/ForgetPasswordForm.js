import classNames from 'classnames/bind';
import styles from './ForgetPasswordForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Form, Input } from 'antd';
import { errorIcon } from '~/assets/Icon';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import PasswordForm from './PasswordForm';
import { emailCode, validateForget } from '~/requestApi/requestForgetPassword';

const cx = classNames.bind(styles);

function ForgetPasswordForm({ setShowForgot }) {
    const [emailValue, setEmailValue] = useState('');
    const [codeValue, setCodeValue] = useState('');
    const [adoptSend, setAdoptSend] = useState(false);
    const [currentSend, setCurrentSend] = useState(120);
    const [sendCodeMessage, setSendCodeMessage] = useState('');
    const [error, setError] = useState([]);
    const [adoptCode, setAdoptCode] = useState(true);
    const [showSetPassword, setShowSetPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const codeInput = useRef();
    const [finalCode, setFinalCode] = useState('');

    useEffect(() => {
        if (!adoptCode) {
            codeInput.current.focus();
        }
    }, [adoptCode]);

    useEffect(() => {
        let countId;
        if (adoptSend) {
            setSendCodeMessage('The code has been emailed to you!.');
            countId = setInterval(() => {
                setCurrentSend((prev) => {
                    if (prev <= 1) {
                        clearInterval(countId);
                        setAdoptSend(false);
                        setCurrentSend(120);
                        setSendCodeMessage('');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setCurrentSend(120);
            setSendCodeMessage('');
        }

        return () => clearInterval(countId);
    }, [adoptSend]);

    const handleSendCode = () => {
        if (emailValue.trim()) {
            setLoading(true);
            emailCode({ email: emailValue })
                .then((res) => {
                    setAdoptCode(false);
                    setLoading(false);
                    setAdoptSend(true);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response && error.response.data && error.response.data.message) {
                        setError([error.response.data.message]);
                        setLoading(false);
                        setAdoptSend(false);
                        setAdoptCode(true);
                    }
                });
        }
    };

    const handleChangeEmail = (e) => {
        const emailValue = e.target.value;
        if (emailValue.trim()) {
            setError([]);
            setEmailValue(emailValue);
        } else {
            setEmailValue('');
            setAdoptSend(false);
            setAdoptCode(true);
            setCodeValue('');
        }
    };

    // Handle Submit
    const handleSubmit = () => {
        if ((emailValue, codeValue)) {
            setError([]);
            const values = {
                email: emailValue,
                token: codeValue,
            };
            setLoadingSubmit(true);
            validateForget(values)
                .then((res) => {
                    setFinalCode(codeValue);
                    setShowSetPassword(true);
                    setLoadingSubmit(false);
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.message) {
                        setError([error.response.data.message]);
                        setLoadingSubmit(false);
                    }
                });
        } else {
            setError((prev) => [...prev, 'Please fill in all the required information.']);
        }
    };

    return (
        <div className={cx('wrap')}>
            <FontAwesomeIcon icon={faBookOpenReader} style={{ fontSize: '3rem' }} />
            {showSetPassword ? (
                <PasswordForm data={finalCode} setShowForgot={setShowForgot} />
            ) : (
                <>
                    <h3 className={cx('title')}>Forget your password ?</h3>
                    <p className={cx('desc')}>
                        Type your email and we will send you a code to set your new password
                    </p>
                    <div className={cx('form-wrap', { error: error.length > 0 })}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor={'input-pass'}>
                                Your email
                            </label>
                            <div className={cx('input-wrap')}>
                                <input
                                    id="input-pass"
                                    className={cx('input')}
                                    placeholder="Your email..."
                                    value={emailValue}
                                    onChange={(e) => handleChangeEmail(e)}
                                />
                                {error.length > 0 && <span className={cx('error')}>{errorIcon}</span>}
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor={'input-pass'}>
                                Enter the confirmation code
                            </label>
                            <div className={cx('input-wrap', { disable: !!adoptCode })}>
                                <input
                                    disabled={adoptCode}
                                    ref={codeInput}
                                    id="input-pass"
                                    className={cx('code-input')}
                                    placeholder="Your code..."
                                    value={codeValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Chỉ cho phép nhập số
                                        if (/^[0-9]*$/.test(value)) {
                                            setCodeValue(value);
                                            setError([]);
                                        }
                                    }}
                                />
                                {adoptSend && !loading ? (
                                    <Button disable classNames={cx('code-btn', 'disable')}>
                                        {currentSend}
                                    </Button>
                                ) : (
                                    <Button
                                        disable={emailValue.trim() || adoptSend ? false : true}
                                        primary
                                        classNames={cx('code-btn')}
                                        onClick={handleSendCode}
                                    >
                                        {loading ? (
                                            <FontAwesomeIcon
                                                icon={faSpinner}
                                                className="fa-solid fa-spinner fa-spin-pulse"
                                            />
                                        ) : (
                                            'Send code'
                                        )}
                                    </Button>
                                )}
                            </div>
                            {sendCodeMessage && error.length === 0 && (
                                <span className={cx('code')}>{sendCodeMessage}</span>
                            )}
                            {error.length > 0 && (
                                <div className={cx('error-wrap')}>
                                    {error.map((item, index) => {
                                        return (
                                            <div className={cx('error-item')} key={index}>
                                                <span className={cx('error-icon')} style={{ color: 'red' }}>
                                                    <FontAwesomeIcon icon={faXmarkCircle} />
                                                </span>
                                                <span className={cx('error-text')}>{item}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <Button save classNames={cx('next-btn')} onClick={handleSubmit} disable={adoptCode}>
                            {loadingSubmit ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-solid fa-spinner fa-spin-pulse"
                                />
                            ) : (
                                'Reset password'
                            )}
                        </Button>
                    </div>
                </>
            )}
            <p className={cx('sub-desc')}>
                By continuing to use this website, you agree to our terms of service.
            </p>
        </div>
    );
}

export default ForgetPasswordForm;
