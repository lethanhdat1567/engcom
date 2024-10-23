import classNames from 'classnames/bind';
import styles from './BlogAdmin.module.scss';
import DataTable from '../../components/DataTable/DataTable';
import { useEffect, useState } from 'react';
import { getBlog } from '~/requestApi/requestAdmin';

const cx = classNames.bind(styles);

function BlogAdmin() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Title',
            dataIndex: 'title',
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

    useEffect(() => {
        setLoading(true);
        getBlog()
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
        <div className={cx('wrap')}>
            <div className={cx('head')}>
                <h2 className={cx('title')}>List Blogs</h2>
            </div>
            <div className={cx('form')}>
                <DataTable
                    columns={columns}
                    data={data}
                    setData={setData}
                    field={'blogs'}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default BlogAdmin;
