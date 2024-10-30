import classNames from 'classnames/bind';
import styles from './ClassAdmin.module.scss';
import DataTable from '../../components/DataTable/DataTable';
import { useEffect, useState } from 'react';
import { getClass } from '~/requestApi/requestAdmin';

const cx = classNames.bind(styles);

function ClassAdmin() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
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
        getClass()
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
                <h2 className={cx('title')}>List Classes</h2>
            </div>
            <div className={cx('form')}>
                <DataTable
                    columns={columns}
                    data={data}
                    setData={setData}
                    field={'classes'}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default ClassAdmin;
