import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { errorIcon } from '~/assets/Icon';
import Button from '~/components/Button';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Form({ type }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const passRef = useRef();
    const validate = {
        Login: [
            {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                rules: {
                    required: 'Vui long nhap email',
                    pattern: {
                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: 'Dinh dang email khong dung',
                    },
                },
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Enter your password',
                rules: {
                    required: 'Vui long nhap mat khau',
                    minLength: {
                        value: 6,
                        message: 'Vui long nhap it nhat 6 ki tu',
                    },
                },
            },
        ],
        Register: [
            {
                name: 'name',
                label: 'What your name?',
                placeholder: 'Enter your fullname',
                rules: {
                    required: 'Vui long nhap ho ten',
                },
            },
            {
                name: 'email',
                label: 'Create your account',
                placeholder: 'Enter your email',
                rules: {
                    required: 'Vui long nhap email',
                    pattern: {
                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: 'Dinh dang email khong dung',
                    },
                },
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Enter your password',
                rules: {
                    required: 'Vui long nhap mat khau',
                    minLength: {
                        value: 6,
                        message: 'Vui long nhap it nhat 6 ki tu',
                    },
                },
            },
        ],
    };

    const handleEyeClick = () => {
        setShowPassword((prev) => !prev);
        passRef.current.focus();
    };
    const onSubmit = (data) => {
        console.log('Form submitted with data:', data);
    };

    return (
        <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
            {validate[type].map((item, index) => {
                const { name, label, placeholder, rules, type } = item;
                if (type === 'password') {
                    return (
                        <div className={cx('form-group', { error: errors[name] })} key={name}>
                            {label && (
                                <label className={cx('label')} htmlFor={name}>
                                    {label}
                                </label>
                            )}
                            <div className={cx('input-wrap')}>
                                <input
                                    className={cx('input')}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                    type={showPassword ? 'text' : 'password'}
                                    ref={passRef}
                                    {...register(name, rules)}
                                />
                                <span className={cx('eye-icon')} onClick={handleEyeClick}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {errors[name] && <span className={cx('error-text')}>{errors[name].message}</span>}
                        </div>
                    );
                }
                return (
                    <div className={cx('form-group', { error: errors[name] })} key={index}>
                        {label && (
                            <label className={cx('label')} htmlFor={name}>
                                {label}
                            </label>
                        )}
                        <div className={cx('input-wrap')}>
                            <input
                                className={cx('input')}
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                {...register(name, rules)}
                            />
                            {errors[name] && <span className={cx('error')}>{errorIcon}</span>}
                        </div>
                        {errors[name] && <span className={cx('error-text')}>{errors[name].message}</span>}
                    </div>
                );
            })}
            <Button primary classNames={cx('submit-btn')} type="submit">
                Submit
            </Button>
        </form>
    );
}

export default Form;
