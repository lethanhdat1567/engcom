import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import UserAdmin from '~/components/UserAdmin/UserAdmin';
import ChartBox from '~/components/ChartBox/ChartBox';
import PieChartBox from '~/components/PieChartBox/PieChartBox';
import { useEffect, useState } from 'react';
import { getClassRank } from '~/requestApi/requestRank';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function HomeAdmin() {
    const [rankData, setRankData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getClassRank()
            .then((res) => {
                setLoading(false);
                setRankData(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('home')}>
            <div className="row g-5">
                <div className="col-12 col-md-6 col-xl-4 ">
                    {loading ? (
                        <Skeleton height="100%" />
                    ) : (
                        <div className={cx('top-deals')}>
                            <h2 className={cx('title')}>Top contributes</h2>
                            <div className={cx('users')}>
                                {rankData.map((item, index) => {
                                    return <UserAdmin data={item} key={index} />;
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 col-xl-8 ">
                    <div className="row g-5">
                        <div className="col-12 col-xl-6">
                            {loading ? (
                                <Skeleton style={{ height: '200px' }} />
                            ) : (
                                <div className={cx('charts')}>
                                    <ChartBox />
                                </div>
                            )}
                        </div>
                        <div className="col-12 col-xl-6">
                            {loading ? (
                                <Skeleton style={{ height: '200px' }} />
                            ) : (
                                <div className={cx('charts')}>
                                    <ChartBox />
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            <div className={cx('charts')}>
                                {loading ? <Skeleton style={{ height: '300px' }} /> : <PieChartBox />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
