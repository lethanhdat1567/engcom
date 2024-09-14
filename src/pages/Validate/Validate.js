import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Modal from '~/components/Modal/Modal';
import Logo from '~/components/Logo/Logo';
import ItemChoice from './ItemChoice';
import { Link } from 'react-router-dom';
import { facebook, google, user } from '~/assets/Icon';
import { useEffect, useState } from 'react';
import Form from './Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Validate({ toggle, setToggle, field }) {
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
        },
        {
            icon: google,
            desc: `${toggleText.text} with google account`,
        },
        {
            icon: facebook,
            desc: `${toggleText.text} with facebook account`,
        },
    ];

    useEffect(() => {
        setToggleText(ValidateText[type]);
    }, [type]);

    const handleForm = (item) => {
        if (item.type) {
            setShowForm(true);
        }
    };

    return (
        <div className={cx('validate')}>
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
                                    return (
                                        <ItemChoice
                                            data={item}
                                            key={index}
                                            onClick={() => handleForm(item)}
                                        />
                                    );
                                })}
                            {/* Form */}
                            {showForm && <Form type={type} />}
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
