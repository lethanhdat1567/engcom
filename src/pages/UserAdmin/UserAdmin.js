import classNames from 'classnames/bind';
import styles from './UserAdmin.module.scss';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import DataTable from '~/components/DataTable/DataTable';
import { getUser, updateRoleUser } from '~/requestApi/requestAdmin';
import { handleAvatar } from '~/utils/handleAvatar';
import { toastify } from '~/utils/toast';

const cx = classNames.bind(styles);

function UserAdmin() {
    // Hooks
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const handleChangeRole = (user_id, role_id) => {
        updateRoleUser(user_id, role_id)
            .then((res) => {
                setData((prev) => {
                    const index = prev.findIndex((user) => user.id == user_id);
                    if (index !== -1) {
                        const updatedUsers = [...prev];
                        updatedUsers[index] = { ...updatedUsers[index], role_id };
                        return updatedUsers;
                    }
                    return prev;
                });
                toastify('Change role sucess', 'success', 1000, 'top-right');
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
                    <div className={cx('select')} style={{ width: '100px' }}>
                        <Select
                            style={{ width: '100%' }}
                            value={`${text.role_id}`}
                            onChange={(value) => handleChangeRole(text.id, value)}
                        >
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
