import classNames from 'classnames/bind';
import styles from './DataTable.module.scss';
import './DataTable.scss';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DataTable({ columns, loading }) {
    return (
        <>
            <div className={cx('table')}>
                <Table
                    columns={[
                        ...columns,
                        {
                            title: 'Actions',
                            key: 'actions',
                            render: (text, record) => {
                                return (
                                    <div className={cx('utils')}>
                                        <Link
                                            style={{ display: 'inline-block', color: 'blue' }}
                                            to={`update/${text.id}`}
                                        >
                                            <FontAwesomeIcon icon={faPenSquare} className={cx('fa-xl')} />
                                        </Link>
                                        <Link style={{ display: 'inline-block', color: 'red' }}>
                                            <FontAwesomeIcon icon={faTrash} className={cx('fa-xl')} />
                                        </Link>
                                    </div>
                                );
                            },
                        },
                    ]}
                    pagination={{
                        pageSize: 5,
                        style: { width: '200px', margin: '0 auto', padding: '20px' },
                    }}
                    scroll={{ x: 1000 }}
                    className={cx('ant-table')}
                    style={{ textAlign: 'center', width: '100%' }}
                />
            </div>
        </>
    );
}

export default DataTable;
