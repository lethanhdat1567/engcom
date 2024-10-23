import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DataTable from '~/components/DataTable/DataTable';
import { getUser } from '~/requestApi/requestAdmin';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function UserAdmin() {
    // Hooks
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (text) => {
                return <img src={handleAvatar(text)} alt="Avatar" className={cx('avatar')} />;
            },
        },
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
                    <div className={cx('select')} style={{ width: '120px' }}>
                        <Select style={{ width: '100%' }} value={`${text.role_id}`}>
                            <Select.Option value="2">User</Select.Option>
                            <Select.Option value="3">Teacher</Select.Option>
                            <Select.Option value="4">Admin</Select.Option>
                        </Select>
                    </div>
                );
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
    ];

    useEffect(() => {
        setLoading(true);
        getUser()
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
        <div className={cx('user')}>
            <div className={cx('head')}>
                <h2 className={cx('title')}>List Users</h2>
            </div>
            <div className={cx('form')}>
                <DataTable
                    columns={columns}
                    data={data}
                    setData={setData}
                    loading={loading}
                    field={'users'}
                />
            </div>
        </div>
    );
}

export default UserAdmin;
