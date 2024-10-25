import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import UserAdmin from '~/components/UserAdmin/UserAdmin';
import ChartBox from '~/components/ChartBox/ChartBox';
import PieChartBox from '~/components/PieChartBox/PieChartBox';
import { useEffect, useState } from 'react';
import { getClassRank } from '~/requestApi/requestRank';
import Skeleton from 'react-loading-skeleton';
import { getSeparate, getStatistics } from '~/requestApi/requestAdmin';

const cx = classNames.bind(styles);

function HomeAdmin() {
    const [rankData, setRankData] = useState([]);
    const [staticData, setStaticData] = useState([]);
    const [separateData, setSeparateData] = useState({});
    const [separateLoading, setSeparateLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [staticLoading, setStaticLoading] = useState(true);

    // Rank
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
    // Stastistic
    useEffect(() => {
        setStaticLoading(true);
        getStatistics()
            .then((res) => {
                setStaticData(res);
                setStaticLoading(false);
            })
            .catch((error) => {
                setStaticLoading(false);
                console.log(error);
            });
    }, []);
    // Separate
    useEffect(() => {
        setSeparateLoading(true);
        getSeparate()
            .then((res) => {
                setSeparateData(res);
                setSeparateLoading(false);
            })
            .catch((error) => {
                setSeparateLoading(false);
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
                        {staticLoading ? (
                            <Skeleton style={{ height: '190px' }} />
                        ) : (
                            <>
                                {staticData.map((item, index) => {
                                    return (
                                        <div className="col-12 col-xl-6" key={index}>
                                            <div className={cx('charts')}>
                                                <ChartBox data={item} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                        <div className="col-12">
                            <div className={cx('charts')}>
                                {separateLoading ? (
                                    <Skeleton height="300px" />
                                ) : (
                                    <PieChartBox item={separateData} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
