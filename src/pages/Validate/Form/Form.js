import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { errorIcon } from '~/assets/Icon';
import Button from '~/components/Button';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { loginValue, RegisterValue } from '~/utils/ValidateFilter';
import request from '~/utils/request';
import Loading from '~/components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Form({ type, setToggle }) {
    // redux
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    // hooks
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passRef = useRef(null);
    const confirmPassRef = useRef(null);
    const validate = {
        Login: [
            {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                rules: {
                    required: 'Please enter your email',
                    pattern: {
                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: 'Invalid email format',
                    },
                },
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Enter your password',
                rules: {
                    required: 'Please enter your password',
                    minLength: {
                        value: 6,
                        message: 'Please enter at least 6 characters',
                    },
                },
            },
        ],

        Register: [
            {
                name: 'name',
                label: 'What is your name?',
                placeholder: 'Enter your fullname',
                rules: {
                    required: 'Please enter your full name',
                },
            },
            {
                name: 'email',
                label: 'Create your account',
                placeholder: 'Enter your email',
                rules: {
                    required: 'Please enter your email',
                    pattern: {
                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                        message: 'Invalid email format',
                    },
                },
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Enter your password',
                rules: {
                    required: 'Please enter your password',
                    minLength: {
                        value: 6,
                        message: 'Please enter at least 6 characters',
                    },
                },
            },
            {
                name: 'password_confirmation',
                label: 'Confirm password',
                type: 'password',
                placeholder: 'Confirm your password',
                rules: {
                    required: 'Please confirm your password',
                },
            },
        ],
    };

    const handleEyeClick = (name) => {
        if (name === 'password') {
            setShowPassword((prev) => !prev);
        } else if (name === 'password_confirmation') {
            setShowConfirmPassword((prev) => !prev);
        }
    };
    const onSubmit = (data) => {
        // Register
        if (data.name) {
            setLoading(true);
            const values = RegisterValue(data);
            request
                .post('/engcom/register', values)
                .then((res) => {
                    const role = res.data.user.role_id;
                    dispatch(usersSlice.actions.getToken(res.data.access_token));
                    dispatch(usersSlice.actions.getUser(res.data.user));
                    setLoading(false);
                    setToggle(false);
                    if (role === 1) {
                        navigate(`/user/role`);
                    }
                })
                .catch((error) => {
                    const errorValue = error.response.data.error;
                    if (errorValue) {
                        setError(error.response.data.field, {
                            type: 'manual',
                            message: errorValue,
                        });
                        setLoading(false);
                        return;
                    }
                });
        } else {
            // login
            setLoading(true);
            const values = loginValue(data);
            request
                .post('/engcom/login', values)
                .then((res) => {
                    const role = res.data.user.role_id;
                    dispatch(usersSlice.actions.getUser(res.data.user));
                    dispatch(usersSlice.actions.getToken(res.data.access_token));
                    setLoading(false);
                    setToggle(false);
                    if (role === 1) {
                        navigate(`/user/role`);
                    }
                })
                .catch((error) => {
                    const errorValue = error.response.data.error;
                    if (errorValue) {
                        setError('password', {
                            type: 'manual',
                            message: errorValue,
                        });
                        setError('email', {
                            type: 'manual',
                            message: errorValue,
                        });
                        setLoading(false);
                        return;
                    }
                });
        }
    };

    return (
        <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
            {loading && <Loading />}
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
                                    type={
                                        (name === 'password' && showPassword) ||
                                        (name === 'password_confirmation' && showConfirmPassword)
                                            ? 'text'
                                            : 'password'
                                    }
                                    ref={name === 'password' ? passRef : confirmPassRef}
                                    {...register(name, rules)}
                                />
                                <span className={cx('eye-icon')} onClick={() => handleEyeClick(name)}>
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
