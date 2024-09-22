import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Modal from '~/components/Modal/Modal';
import Logo from '~/components/Logo/Logo';
import ItemChoice from './ItemChoice';
import { Link, useNavigate } from 'react-router-dom';
import { facebook, google, user } from '~/assets/Icon';
import { useEffect, useState } from 'react';
import Form from './Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '~/firebase/config';
import Loading from '~/components/Loading/Loading';
import { postSocial } from '~/requestApi/requestApi';
import { useDispatch } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';

const cx = classNames.bind(styles);
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

function Validate({ toggle, setToggle, field }) {
    const [validateError, setValidateError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleError = async (error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            console.log('aloalo');
        } else {
            console.log(error);
        }
    };
    // Facebook
    const handleFbLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, fbProvider);
            const userValue = await postSocial(result);
            dispatch(usersSlice.actions.getToken(userValue.data.access_token));
            dispatch(usersSlice.actions.getUser(userValue.data.user));
            setToggle(false);
            if (userValue.data.user.role_id === 1) {
                navigate('/user/role');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error posting social:', error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    // Google
    const handleGGLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, ggProvider);
            const userValue = await postSocial(result);
            dispatch(usersSlice.actions.getUser(userValue.data.user));
            dispatch(usersSlice.actions.getToken(userValue.data.access_token));
            setToggle(false);
            if (userValue.data.user.role_id === 1) {
                navigate('/user/role');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error posting social:', error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleForm = (item) => {
        if (item.type) {
            setShowForm(true);
        }
    };
    // Text Validate
    const ValidateText = {
        Register: {
            title: 'Welcome to our website!',
            text: 'Register',
            formInput: '',
            toggle: 'Login',
            ask: 'You have a account yet?',
        },
        Login: {
            title: 'Login to our website!',
            text: 'Login',
            formInput: '',
            toggle: 'Register',
            ask: "You don't have a account?",
        },
    };
    // Hooks
    const [type, setType] = useState(field);
    const [toggleText, setToggleText] = useState(ValidateText[type]);
    const [showForm, setShowForm] = useState(false);

    // Item choices
    const ItemChoices = [
        {
            icon: user,
            desc: `${toggleText.text} with email/phone number`,
            type: 'form',
            onClick: handleForm,
        },
        {
            icon: google,
            desc: `${toggleText.text} with google account`,
            onClick: handleGGLogin,
        },
        {
            icon: facebook,
            desc: `${toggleText.text} with facebook account`,
            onClick: handleFbLogin,
        },
    ];

    useEffect(() => {
        setToggleText(ValidateText[type]);
    }, [type]);

    return (
        <div className={cx('validate')}>
            {loading && <Loading />}
            <Modal toggle={toggle} setToggle={setToggle}>
                <div className={cx('wrap')}>
                    {showForm && (
                        <div
                            className={cx('back')}
                            onClick={() => {
                                setShowForm(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className={cx('back-icon')} />
                            <span className={cx('back-desc')}>Back</span>
                        </div>
                    )}
                    <header className={cx('header')}>
                        <Logo className={cx('logo')} />
                        <h2 className={cx('title')}>{toggleText.title}</h2>
                        <p className={cx('desc')}>Each person should only use one account.</p>
                    </header>
                    <main className={cx('main')}>
                        <div className={cx('form-wrap')}>
                            {!showForm &&
                                ItemChoices.map((item, index) => {
                                    return <ItemChoice data={item} key={index} onClick={item.onClick} />;
                                })}
                            {/* Form */}
                            {showForm && <Form setToggle={setToggle} type={type} />}
                        </div>
                        <p className={cx('sub')}>
                            {toggleText.ask}
                            <Link className={cx('link-alert')} onClick={() => setType(toggleText.toggle)}>
                                {toggleText.toggle}
                            </Link>
                        </p>
                        <Link className={cx('forget', 'link-alert')}>Forget password</Link>
                        <p className={cx('footer-desc')}>
                            Continued use of this site constitutes your agreement to
                            <Link className={cx('service')}>our terms of service</Link>.
                        </p>
                    </main>
                </div>
            </Modal>
        </div>
    );
}

export default Validate;
