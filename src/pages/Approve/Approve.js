import classNames from 'classnames/bind';
import styles from './Approve.module.scss';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { getApprove, updateApprove } from '~/requestApi/requestAdmin';
import { ClipLoader } from 'react-spinners';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function Approve() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);

    const handleApprove = (record) => {
        const values = { deleted: 1 };
        setApproveLoading(true);
        updateApprove(record.classes_id, values)
            .then((res) => {
                setData((prev) => prev.filter((item) => item.classes_id !== record.classes_id));
                toastify('Class have been approve', 'success', 2000, 'top-right');
                setApproveLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApproveLoading(false);
            });
    };

    const handleDeny = (record) => {
        const values = { deleted: 0 };
        setApproveLoading(true);
        updateApprove(record.classes_id, values)
            .then((res) => {
                setData((prev) => prev.filter((item) => item.classes_id !== record.classes_id));
                toastify('Class have been deny', 'success', 2000, 'top-right');
                setApproveLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApproveLoading(false);
            });
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
                    {approveLoading ? (
                        <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                    ) : (
                        <>
                            <Tippy content="Approve">
                                <Link
                                    className={cx('icon', 'fa-lg')}
                                    style={{ color: 'green' }}
                                    onClick={() => handleApprove(record)}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Link>
                            </Tippy>
                            <Tippy content="Delete">
                                <Link
                                    className={cx('icon', 'fa-lg')}
                                    style={{ color: 'red' }}
                                    onClick={() => handleDeny(record)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Link>
                            </Tippy>
                        </>
                    )}
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
    );
}

export default Approve;
