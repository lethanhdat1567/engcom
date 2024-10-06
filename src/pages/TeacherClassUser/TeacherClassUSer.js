import classNames from 'classnames/bind';
import styles from './TeacherClassUser.module.scss';
import { Space, Table, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserClass } from '~/requestApi/requestClass';

const cx = classNames.bind(styles);

function TeacherClassUser() {
    const { slug } = useParams();
    const [usersData, setUsersData] = useState();
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <img
                    src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${avatar}`}
                    alt="User Avatar"
                    className={cx('avatar')}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
        },

        {
            title: 'Utils',
            key: 'action',
            render: (_, record) => (
                <div className={cx('utils')}>
                    <Link className={cx('icon')} style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                    </Link>
                    <Link className={cx('icon')} style={{ color: 'blue' }}>
                        <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                    </Link>
                </div>
            ),
        },
    ];
    useEffect(() => {
        getUserClass(slug)
            .then((res) => {
                const dataWithKeys = res.data.map((user, index) => ({
                    ...user,
                    key: user.id || index,
                }));
                setUsersData(dataWithKeys);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <Table scroll={{ x: 1000 }} dataSource={usersData} columns={columns} className={cx('table')} />;
}

export default TeacherClassUser;
