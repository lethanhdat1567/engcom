import classNames from 'classnames/bind';
import styles from './AlertItem.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { Alert, Button, Modal } from 'antd';
import request from '~/utils/request';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function AlertItem({ data, setAlertData }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);

    const handleShowModal = () => {
        setShowDeleteModal(true);
    };
    const handleDelete = () => {
        setLoading(true);
        request
            .delete(`engcom/alert/${data.id}`)
            .then((res) => {
                setAlertData((prev) => prev.filter((item) => item.id !== data.id));
                setShowDeleteModal(false);
                setLoading(false);
                toastify('Delete success!', 'success', 2000, 'top-right');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setShowDeleteModal(false);
            });
    };

    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('head')}>
                    <h3 className={cx('title')}>
                        <span className={cx('decor')}>#</span> {data.title}
                    </h3>
                    {user.role_id == 4 && (
                        <Tippy content="Delete content">
                            <span className={cx('delete-icon')} onClick={handleShowModal}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} className="fa-lg" />
                            </span>
                        </Tippy>
                    )}
                </div>
                {data.thumbnail && (
                    <img
                        src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${data.thumbnail}`}
                        className={cx('img')}
                    />
                )}
                <p className={cx('desc')}>{data.content}</p>
            </div>
            <Modal
                open={showDeleteModal}
                title="Delete confirmation"
                footer={[
                    <Button key="no" onClick={() => setShowDeleteModal(false)}>
                        No
                    </Button>,
                    <Button key="yes" type="primary" onClick={handleDelete}>
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                        ) : (
                            'Yes'
                        )}
                    </Button>,
                ]}
            >
                <Alert description="Are you sure you want to delete" type="error" showIcon />
            </Modal>
        </>
    );
}

export default AlertItem;
