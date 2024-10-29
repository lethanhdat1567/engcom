import classNames from 'classnames/bind';
import styles from './TeacherClassUser.module.scss';
import { Space, Table, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserClass } from '~/requestApi/requestClass';
import Skeleton from 'react-loading-skeleton';
import { handleAvatar } from '~/utils/handleAvatar';

const cx = classNames.bind(styles);

function TeacherClassUser() {
    const { slug } = useParams();
    const [usersData, setUsersData] = useState();
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <img src={handleAvatar(avatar)} alt="User Avatar" className={cx('avatar')} />,
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
    ];
    useEffect(() => {
        setLoading(true);
        getUserClass(slug)
            .then((res) => {
                const dataWithKeys = res.data.map((user, index) => ({
                    ...user,
                    key: user.id || index,
                }));
                setUsersData(dataWithKeys);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return loading ? (
        <Skeleton height={300} />
    ) : (
        <Table scroll={{ x: 1000 }} dataSource={usersData} columns={columns} className={cx('table')} />
    );
}

export default TeacherClassUser;
