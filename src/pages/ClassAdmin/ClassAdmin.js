import classNames from 'classnames/bind';
import styles from './ClassAdmin.module.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ClassAdmin() {
    const [loading, setLoading] = useState(false);
    const [dataBlogs, setDataBlogs] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
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
    return (
        <div className={cx('wrap')}>
            <div className={cx('head')}>
                <h2 className={cx('title')}>List Classes</h2>
                <Link to={`${process.env.REACT_APP_ROOT}/admin/blogs/create`}>
                    <Button type="primary">Add Class</Button>
                </Link>
            </div>
            <div className={cx('form')}>
                <DataTable columns={columns} data={dataBlogs} field={'blogs'} loading={loading} />
            </div>
        </div>
    );
}

export default ClassAdmin;
