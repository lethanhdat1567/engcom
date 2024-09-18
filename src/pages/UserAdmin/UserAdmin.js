import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DataTable from '~/components/DataTable/DataTable';

const cx = classNames.bind(styles);

function UserAdmin() {
    // Hooks
    const [dataUsers, setDataUsers] = useState();
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Role',
            key: 'role',
            render: (text, record) => {
                return (
                    <div className={cx('select')}>
                        <Select
                            style={{ width: '100%' }}
                            defaultValue={
                                text.role_id === 1 ? `${text.role_id}: User` : `${text.role_id}: Admin`
                            }
                        >
                            <Select.Option value="1">1: User</Select.Option>
                            <Select.Option value="2">2: Admin</Select.Option>
                        </Select>
                        <div className={cx('custom-arrow')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
        },
    ];
    const data = dataUsers;

    return (
        <div className={cx('user')}>
            <div className={cx('head')}>
                <h2 className={cx('title')}>List Users</h2>
                <Link to={`${process.env.REACT_APP_ROOT}/admin/users/create`}>
                    <Button type="primary">Add User</Button>
                </Link>
            </div>
            <div className={cx('form')}>
                <DataTable columns={columns} data={data} loading={loading} field={'users'} />
            </div>
        </div>
    );
}

export default UserAdmin;
