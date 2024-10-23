import classNames from 'classnames/bind';
import styles from './AlertModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlertItem from './components/AlertItem/AlertItem';
import { useEffect, useState } from 'react';
import request from '~/utils/request';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function AlertModal({ showNav, setShowNav }) {
    const [alertData, setAlertData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setShowNav(false);
        localStorage.setItem('ALERT', 'true');
    };

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
        <div className={cx('modal', { active: showNav })}>
            <div className={cx('content')}>
                {loading ? (
                    <div style={{ marginTop: '20px' }}>
                        <Skeleton height={50} />
                        <Skeleton height={390} style={{ marginTop: '10px' }} />
                        <Skeleton height={20} count={3} style={{ margin: '10px 0px' }} />
                    </div>
                ) : (
                    <>
                        <div className={cx('close-wrap')} onClick={handleClose}>
                            <span className={cx('close-btn')}>
                                <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                            </span>
                        </div>
                        <div className={cx('body')}>
                            {alertData.map((item, index) => {
                                return <AlertItem data={item} key={index} />;
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className={cx('over-lay')}></div>
        </div>
    );
}

export default AlertModal;
