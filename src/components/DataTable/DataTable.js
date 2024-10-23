import classNames from 'classnames/bind';
import styles from './DataTable.module.scss';
import './DataTable.scss';
import { Alert, Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenSquare, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { deleteClass } from '~/requestApi/requestClass';
import { deleteBlog } from '~/requestApi/requestBlog';
import { deleteUser } from '~/requestApi/requestAdmin';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function DataTable({ columns, data, setData, field, loading }) {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [deletedLoading, setDeletedLoading] = useState(false);

    const handleShowModal = (text) => {
        setShowModalDelete(true);
        setDeleteId(text.id);
    };

    const handleDelete = () => {
        let id = deleteId;
        setDeletedLoading(true);
        if (field === 'classes') {
            deleteClass(id)
                .then((res) => {
                    const newData = data.filter((item) => item.id !== id);
                    setData(newData);
                    setShowModalDelete(false);
                    setDeletedLoading(false);
                    toastify('Delete success', 'success', 2000, 'top-right');
                    console.log(res);
                })
                .catch((error) => {
                    setDeletedLoading(false);
                    toastify('Delete success', 'success', 2000, 'top-right');
                    console.log(error);
                });
        } else if (field === 'blogs') {
            deleteBlog(id)
                .then((res) => {
                    const newData = data.filter((item) => item.id !== id);
                    setData(newData);
                    setShowModalDelete(false);
                    setDeletedLoading(false);
                    toastify('Delete success', 'success', 2000, 'top-right');
                    console.log(res);
                })
                .catch((error) => {
                    setDeletedLoading(false);
                    console.log(error);
                });
        } else if (field === 'users') {
            deleteUser(id)
                .then((res) => {
                    const newData = data.filter((item) => item.id !== id);
                    setData(newData);
                    setShowModalDelete(false);
                    setDeletedLoading(false);
                    toastify('Delete success', 'success', 2000, 'top-right');
                    console.log(res);
                })
                .catch((error) => {
                    setDeletedLoading(false);
                    console.log(error);
                });
        }
    };
    return (
        <>
            {loading ? (
                <div className={cx('load-wrap')}>
                    <ClipLoader color="#fff" />
                </div>
            ) : (
                <div className={cx('table')}>
                    <Table
                        mountNode
                        rowKey="id"
                        dataSource={data}
                        columns={[
                            ...columns,
                            {
                                title: 'Actions',
                                key: 'actions',
                                render: (text, record) => {
                                    return (
                                        <div className={cx('utils')}>
                                            {field === 'blogs' && (
                                                <Tippy content="Detail">
                                                    <Link
                                                        style={{ display: 'inline-block', color: 'blue' }}
                                                        to={`${process.env.REACT_APP_ROOT}/admin/blogs/${text.id}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className={cx('fa-xl')}
                                                        />
                                                    </Link>
                                                </Tippy>
                                            )}
                                            <Tippy content="Delete">
                                                <Link
                                                    style={{ display: 'inline-block', color: 'red' }}
                                                    onClick={() => handleShowModal(text)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className={cx('fa-xl')} />
                                                </Link>
                                            </Tippy>
                                        </div>
                                    );
                                },
                            },
                        ]}
                        pagination={{
                            pageSize: 5,
                        }}
                        scroll={{ x: 1000 }}
                        className={cx('ant-table')}
                        style={{ textAlign: 'center', width: '100%' }}
                    />
                </div>
            )}
            <Modal
                open={showModalDelete}
                title="Delete confirmation"
                footer={[
                    <Button
                        key="no"
                        onClick={() => {
                            setShowModalDelete(false);
                            setDeleteId();
                        }}
                    >
                        No
                    </Button>,
                    <Button key="yes" type="primary" onClick={handleDelete}>
                        {deletedLoading ? (
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

export default DataTable;
