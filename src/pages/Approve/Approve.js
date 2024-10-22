import classNames from 'classnames/bind';
import styles from './Approve.module.scss';
import { useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function Approve() {
    const columns = [
        {
            title: 'Class name',
            dataIndex: 'class_name',
        },
        {
            title: 'User name',
            dataIndex: 'user_name',
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
                            to={`${process.env.REACT_APP_ROOT}/own/${record.class_id}`}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </Tippy>
                    <Tippy content="Approve">
                        <Link className={cx('icon', 'fa-lg')} style={{ color: 'green' }}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Link>
                    </Tippy>
                    <Tippy content="Delete">
                        <Link className={cx('icon', 'fa-lg')} style={{ color: 'red' }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Link>
                    </Tippy>
                </div>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            class_id: '195',
            class_name: 'Math 101',
            user_name: 'John Doe',
            created_at: '2024-01-01',
        },
        {
            key: '2',
            class_id: 'class_102',
            class_name: 'Physics 101',
            user_name: 'Jane Smith',
            created_at: '2024-02-01',
        },
        // Thêm các đối tượng khác nếu cần
    ];

    return (
        <div className={cx('table')}>
            <h2 className={cx('title')}>Approve class</h2>
            <Table
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
        </div>
    );
}

export default Approve;
