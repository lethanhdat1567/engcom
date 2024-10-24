import classNames from 'classnames/bind';
import styles from './ForgetPasswordForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { Form, Input } from 'antd';
import { errorIcon } from '~/assets/Icon';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import PasswordForm from './PasswordForm';

const cx = classNames.bind(styles);

function ForgetPasswordForm() {
    const [emailValue, setEmailValue] = useState('');
    const [codeValue, setCodeValue] = useState('');
    const [adoptSend, setAdoptSend] = useState(false);
    const [currentSend, setCurrentSend] = useState(120);
    const [error, setError] = useState([]);
    const [adoptCode, setAdoptCode] = useState(true);
    const [showSetPassword, setShowSetPassword] = useState(false);
    const codeInput = useRef();

    useEffect(() => {
        if (!adoptCode) {
            codeInput.current.focus();
        }
    }, [adoptCode]);

    useEffect(() => {
        let countId;
        if (adoptSend) {
            countId = setInterval(() => {
                setCurrentSend((prev) => {
                    if (prev <= 1) {
                        clearInterval(countId);
                        setAdoptSend(false);
                        setCurrentSend(120);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setCurrentSend(120);
        }

        return () => clearInterval(countId);
    }, [adoptSend]);

    const handleSendCode = () => {
        if (emailValue.trim()) {
            setAdoptCode(false);
            setAdoptSend(true);
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
                code: codeValue,
            };
            setShowSetPassword(true);
        } else {
            setError((prev) => [...prev, 'Vui long nhap day du thong tin']);
        }
    };

    return (
        <div className={cx('wrap')}>
            <FontAwesomeIcon icon={faBookOpenReader} style={{ fontSize: '3rem' }} />
            {showSetPassword ? (
                <PasswordForm />
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
                                {adoptSend ? (
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
                                        Send code
                                    </Button>
                                )}
                            </div>
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
                            Reset password
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
