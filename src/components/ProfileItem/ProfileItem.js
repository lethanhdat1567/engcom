import classNames from 'classnames/bind';
import styles from './ProfileItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal/Modal';
import { useRef, useState } from 'react';
import imgs from '~/assets/Image';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ProfileItem() {
    const [toggleModal, setToggleModal] = useState(false);

    return (
        <>
            <div className={cx('item')} onClick={() => setToggleModal(true)}>
                <h3 className={cx('item-label')}>Ho va Ten</h3>
                <span className={cx('info')}>Le THanh Dat</span>
                {/* <img className={cx('img')} src={imgs.unsetAvatar} /> */}
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>
            <Modal toggle={toggleModal} setToggle={setToggleModal}>
                <div className={cx('modal-wrap')}>
                    <h4 className={cx('modal-title')}>Update your name</h4>
                    <p className={cx('modal-desc')}>
                        Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.
                    </p>
                    {/* <div className={cx('modal-form-group')}>
                        <label className={cx('modal-label')}>Ho va Ten</label>
                        <div className={cx('modal-input-wrap')}>
                            <input className={cx('modal-input')} />
                        </div>
                    </div> */}
                    <div className={cx('modal-form-group')}>
                        <img src={imgs.unsetAvatar} className={cx('avatar')} />
                        <label htmlFor="avatar" className={cx('upload-wrap')}>
                            <span className={cx('upload-icon')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Upload your file
                        </label>
                        <input id="avatar" type="file" hidden />
                    </div>
                    <button className={cx('btn')}>Save</button>
                </div>
            </Modal>
        </>
    );
}

export default ProfileItem;
