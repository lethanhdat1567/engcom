import classNames from 'classnames/bind';
import styles from './Approve.module.scss';
import { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { getApprove, updateApprove } from '~/requestApi/requestAdmin';
import { ClipLoader } from 'react-spinners';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function Approve() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [showDeny, setShowDeny] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleApprove = () => {
        const values = { deleted: 1 };
        setApproveLoading(true);
        updateApprove(selectedRecord.classes_id, values)
            .then(() => {
                setData((prev) => prev.filter((item) => item.classes_id !== selectedRecord.classes_id));
                toastify('Class has been approved', 'success', 2000, 'top-right');
                setShowApprove(false);
                setApproveLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApproveLoading(false);
            });
    };

    const handleDeny = () => {
        const values = { deleted: 0 };
        setApproveLoading(true);
        updateApprove(selectedRecord.classes_id, values)
            .then(() => {
                setData((prev) => prev.filter((item) => item.classes_id !== selectedRecord.classes_id));
                toastify('Class has been denied', 'success', 2000, 'top-right');
                setShowDeny(false);
                setApproveLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApproveLoading(false);
            });
    };

    const handleShowApprove = () => {
        handleApprove();
    };

    const handleShowDeny = () => {
        handleDeny();
    };

    const columns = [
        {
            title: 'Class name',
            dataIndex: 'classes_name',
        },
        {
            title: 'User name',
            dataIndex: 'users_name',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Utils',
            dataIndex: 'utils',
            render: (text, record) => (
                <div className={cx('utils')}>
                    <Tippy content="Detail">
                        <Link
                            className={cx('icon', 'fa-lg')}
                            style={{ color: 'blue' }}
                            to={`${process.env.REACT_APP_ROOT}/own/${record.classes_id}`}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </Tippy>
                    <Tippy content="Approve">
                        <Link
                            className={cx('icon', 'fa-lg')}
                            style={{ color: 'green' }}
                            onClick={() => {
                                setShowApprove(true);
                                setSelectedRecord(record);
                            }}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Link>
                    </Tippy>
                    <Tippy content="Deny">
                        <Link
                            className={cx('icon', 'fa-lg')}
                            style={{ color: 'red' }}
                            onClick={() => {
                                setShowDeny(true);
                                setSelectedRecord(record);
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Link>
                    </Tippy>
                </div>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        getApprove()
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className={cx('table')}>
                <h2 className={cx('title')}>Approve class</h2>
                {loading ? (
                    <div className={cx('load-wrap')}>
                        <ClipLoader color="#fff" />
                    </div>
                ) : (
                    <Table
                        rowKey="classes_id"
                        dataSource={data}
                        columns={columns}
                        pagination={{
                            pageSize: 5,
                            style: { width: '200px', margin: '0 auto', padding: '20px' },
                        }}
                        scroll={{ x: 1000 }}
                        className={cx('ant-table')}
                        style={{ textAlign: 'center', width: '100%' }}
                    />
                )}
            </div>

            <Modal
                open={showApprove}
                onCancel={() => {
                    setShowApprove(false);
                    setSelectedRecord(null);
                }}
                onOk={handleShowApprove}
                title="Warning Information"
                footer={[
                    <Button key="cancel" onClick={() => setShowApprove(false)}>
                        Cancel
                    </Button>,
                    <Button key="approve" type="primary" loading={approveLoading} onClick={handleShowApprove}>
                        Approve
                    </Button>,
                ]}
            >
                <Alert type="info" description="Are you sure to approve this class?" showIcon />
            </Modal>

            <Modal
                open={showDeny}
                onCancel={() => {
                    setShowDeny(false);
                    setSelectedRecord(null);
                }}
                onOk={handleShowDeny}
                title="Warning Information"
                footer={[
                    <Button key="cancel" onClick={() => setShowDeny(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="deny"
                        type="primary"
                        danger
                        loading={approveLoading}
                        onClick={handleShowDeny}
                    >
                        Deny
                    </Button>,
                ]}
            >
                <Alert type="info" description="Are you sure to deny this class?" showIcon />
            </Modal>
        </>
    );
}

export default Approve;
