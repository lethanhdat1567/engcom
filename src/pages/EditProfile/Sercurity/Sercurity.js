import classNames from 'classnames/bind';
import styles from './Sercurity.module.scss';
import ProfileItem from '~/components/ProfileItem/ProfileItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal/Modal';
import { useState } from 'react';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { updatePassword } from '~/requestApi/requestUser';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function Sercurity() {
    const user = useSelector((state) => state.user.user);
    const [toggleModal, setToggleModal] = useState(false);
    const [ownPassword, setOwnPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOwnPassword, setShowOwnPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = () => {
        if (ownPassword.trim() && newPassword.trim()) {
            if (ownPassword == newPassword) {
                const values = {
                    userid: user.id,
                    password: newPassword,
                };
                updatePassword(values)
                    .then((res) => {
                        setToggleModal(false);
                        toastify('Change password success!', 'success', 2000, 'top-right');
                    })
                    .catch((error) => console.log(error));
            } else {
                setErrorMessage('Passwords do not match.');
            }
        } else {
            setErrorMessage('Both fields are required');
        }
    };

    return (
        <>
            <div className={cx('wrap')} onClick={() => setToggleModal(true)}>
                <h2 className={cx('title')}>Personal Information.</h2>
                <p className={cx('desc')}>Manage your personal information.</p>
                <div className={cx('cart-wrap')}>
                    <div className={cx('item')}>
                        <h3 className={cx('item-label')}>Password</h3>
                        <span className={cx('info')}>Change your password</span>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </div>
                </div>
            </div>
            <Modal toggle={toggleModal} setToggle={setToggleModal}>
                <div className={cx('modal-wrap')}>
                    <>
                        <h4 className={cx('modal-title')}>Update Your Password</h4>
                        <p className={cx('modal-desc')}>
                            This feature allows users to update their password easily and securely.
                        </p>
                        <div className={cx('modal-form-group')}>
                            <label className={cx('modal-label')}>Your password</label>
                            <div className={cx('modal-input-wrap', { error: errorMessage })}>
                                <input
                                    type={showOwnPassword ? 'text' : 'password'}
                                    className={cx('modal-input')}
                                    onChange={(e) => {
                                        setOwnPassword(e.target.value);
                                        setErrorMessage();
                                    }}
                                    value={ownPassword}
                                />
                                <span
                                    className={cx('eye-icon')}
                                    onClick={() => setShowOwnPassword(!showOwnPassword)}
                                >
                                    <FontAwesomeIcon icon={showOwnPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('modal-form-group')}>
                            <label className={cx('modal-label')}>New password</label>
                            <div className={cx('modal-input-wrap', { error: errorMessage })}>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    className={cx('modal-input')}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setErrorMessage();
                                    }}
                                    value={newPassword}
                                />
                                <span
                                    className={cx('eye-icon')}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className={cx('error-wrap')}>
                                <div className={cx('error-item')}>
                                    <span className={cx('error-icon')} style={{ color: 'red' }}>
                                        <FontAwesomeIcon icon={faXmarkCircle} />
                                    </span>
                                    <span className={cx('error-text')}>{errorMessage}</span>
                                </div>
                            </div>
                        )}
                        <button className={cx('btn')} onClick={handleSubmit}>
                            Save
                        </button>
                    </>
                </div>
            </Modal>
        </>
    );
}

export default Sercurity;
