import classNames from 'classnames/bind';
import styles from './Sercurity.module.scss';
import ProfileItem from '~/components/ProfileItem/ProfileItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal/Modal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sercurity() {
    const [toggleModal, setToggleModal] = useState(false);
    const [ownPassword, setOwnPassword] = useState('');
    const [newPassowrd, setNewPassword] = useState('');

    const handleSubmit = () => {
        console.log('own password: ', ownPassword);
        console.log(('new password: ', newPassowrd));
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
                            <div className={cx('modal-input-wrap')}>
                                <input
                                    type="password"
                                    className={cx('modal-input')}
                                    onChange={(e) => setOwnPassword(e.target.value)}
                                    value={ownPassword}
                                />
                            </div>
                        </div>
                        <div className={cx('modal-form-group')}>
                            <label className={cx('modal-label')}>New password</label>
                            <div className={cx('modal-input-wrap')}>
                                <input
                                    type="password"
                                    className={cx('modal-input')}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassowrd}
                                />
                            </div>
                        </div>
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
