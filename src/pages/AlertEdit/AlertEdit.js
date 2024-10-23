import classNames from 'classnames/bind';
import styles from './AlertEdit.module.scss';
import AlertItem from '~/Layouts/components/AlertModal/components/AlertItem/AlertItem';
import CreateAlert from './components/CreateAlert/CreateAlert';
import { useEffect, useState } from 'react';
import request from '~/utils/request';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function AlertEdit() {
    const [alertData, setAlertData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        request
            .get(`engcom/alert`)
            .then((res) => {
                setLoading(false);
                setAlertData(res.data.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('body')}>
                {loading ? (
                    <div style={{ marginTop: '20px' }}>
                        <Skeleton height={50} />
                        <Skeleton height={390} style={{ marginTop: '10px' }} />
                        <Skeleton height={20} count={3} style={{ margin: '10px 0px' }} />
                    </div>
                ) : (
                    <>
                        <CreateAlert alertData={alertData} setAlertData={setAlertData} />
                        {alertData.map((item, index) => {
                            return (
                                <AlertItem
                                    data={item}
                                    key={index}
                                    alertData={alertData}
                                    setAlertData={setAlertData}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default AlertEdit;
