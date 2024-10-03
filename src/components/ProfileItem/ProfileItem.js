import classNames from 'classnames/bind';
import styles from './ProfileItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import imgs from '~/assets/Image';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Img from '../Img';
import { updateUser } from '~/requestApi/requestUser';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { Select } from 'antd';
import request from '~/utils/request';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function ProfileItem({ data }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [toggleModal, setToggleModal] = useState(false);
    const [adopt, setAdopt] = useState(false);
    const [inputValue, setInputValue] = useState(data.data || '');
    const [uploadValue, setUploadValue] = useState(data.avatar || '');
    const [genderValue, setGenderValue] = useState(data.gender || '');
    const [uploadAdopt, setUploadAdopt] = useState(true);
    const [cloneAvatar, setCloneAvatar] = useState();

    // Upload
    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadAdopt(false);
            setUploadValue(file);

            // Tạo URL preview
            file.preview = URL.createObjectURL(file);
            setCloneAvatar(file);

            // Reset input file
            e.target.value = null;
        } else {
            setUploadAdopt(true);
        }
    };

    // Change value
    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            setAdopt(false);
            setInputValue(value);
        } else {
            setInputValue('');
            setAdopt(true);
        }
    };

    // Submit
    const handleSubmit = () => {
        if (!adopt) {
            let value;

            if (data.type === 'upload') {
                const formData = new FormData();
                formData.append('file', uploadValue); // Thêm file vào FormData

                request
                    .post(`engcom/avatar/${user.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        dispatch(usersSlice.actions.getUser(res.data.data));
                        setToggleModal(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                if (data.type === 'gender') {
                    value = { [data.name]: genderValue };
                } else {
                    value = { [data.name]: inputValue };
                }
                updateUser(value, user.id)
                    .then((res) => {
                        dispatch(usersSlice.actions.getUser(res.data));
                        setToggleModal(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    useEffect(() => {
        if (!toggleModal) {
            const inputHasValue = !!inputValue;
            const genderHasValue = !!genderValue;
            const uploadHasValue = !!uploadValue;

            setInputValue(data.data || '');
            setUploadValue(data.avatar || '');
            setGenderValue(data.gender || '');
            setCloneAvatar(data.avatar);

            // Kiểm tra các giá trị và cập nhật setAdopt
            setAdopt(!(inputHasValue || genderHasValue || uploadHasValue));
        }

        return () => {
            cloneAvatar && URL.revokeObjectURL(cloneAvatar.preview);
        };
    }, [toggleModal, data.data, data.avatar, data.gender]);

    return (
        <>
            <div className={cx('item')} onClick={() => setToggleModal(true)}>
                <h3 className={cx('item-label')}>{data.title}</h3>
                {data.type === 'upload' ? (
                    <Img
                        className={cx('img')}
                        src={
                            user.avatar?.includes('googleusercontent.com') ||
                            user.avatar?.includes('facebook.com')
                                ? user.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                        }
                        alt="User Avatar"
                    />
                ) : data.type === 'gender' ? (
                    <span className={cx('info')}>{genderValue || 'Unset'}</span>
                ) : (
                    <span className={cx('info')}>{data.data || 'Unset'}</span>
                )}
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
            </div>

            <Modal toggle={toggleModal} setToggle={setToggleModal}>
                <div className={cx('modal-wrap')}>
                    {data.type === 'upload' ? (
                        <>
                            <div className={cx('modal-form-group')}>
                                <Img
                                    src={cloneAvatar?.preview || handleAvatar(data.avatar)}
                                    className={cx('avatar')}
                                />
                                <label htmlFor="avatar" className={cx('upload-wrap')}>
                                    <span className={cx('upload-icon')}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    Upload your file
                                </label>
                                <input id="avatar" type="file" hidden onChange={(e) => handleUpload(e)} />
                            </div>
                            <button
                                className={cx('btn-upload', { adopt: uploadAdopt })}
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <h4 className={cx('modal-title')}>Update Your {data.title}</h4>
                            <p className={cx('modal-desc')}>
                                Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của
                                bạn.
                            </p>
                            <div className={cx('modal-form-group')}>
                                <label className={cx('modal-label')}>{data.title}</label>
                                {data.type === 'gender' ? (
                                    <Select
                                        placeholder="---Select your gender---"
                                        onChange={(value) => {
                                            setGenderValue(value);
                                            setAdopt(false);
                                        }}
                                        value={genderValue}
                                    >
                                        <Select.Option value="male">Male</Select.Option>
                                        <Select.Option value="female">Female</Select.Option>
                                    </Select>
                                ) : (
                                    <div className={cx('modal-input-wrap')}>
                                        <input
                                            className={cx('modal-input')}
                                            value={inputValue}
                                            name={data.name}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                )}
                            </div>
                            <button className={cx('btn')} onClick={handleSubmit}>
                                Save
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default ProfileItem;
