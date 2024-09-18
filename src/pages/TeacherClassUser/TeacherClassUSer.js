import classNames from 'classnames/bind';
import styles from './TeacherClassUser.module.scss';
import { Space, Table, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherClassUser() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((tag) => {
                        let color = tag === 'done' ? 'green' : 'red';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            status: ['done'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            status: ['incompleted'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            status: ['done'],
        },
    ];

    return <Table dataSource={data} columns={columns} className={cx('table')} />;
}

export default TeacherClassUser;
