import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import UserAdmin from '~/components/UserAdmin/UserAdmin';
import ChartBox from '~/components/ChartBox/ChartBox';
import PieChartBox from '~/components/PieChartBox/PieChartBox';

const cx = classNames.bind(styles);

function HomeAdmin() {
    return (
        <div className={cx('home')}>
            <div className="row g-5">
                <div className="col-12 col-md-6 col-xl-4 ">
                    <div className={cx('top-deals')}>
                        <h2 className={cx('title')}>Top contributes</h2>
                        <div className={cx('users')}>
                            <UserAdmin />
                            <UserAdmin />
                            <UserAdmin />
                            <UserAdmin />
                            <UserAdmin />
                            <UserAdmin />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-8 ">
                    <div className="row g-5">
                        <div className="col-12 col-xl-6">
                            <div className={cx('charts')}>
                                <ChartBox />
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className={cx('charts')}>
                                <ChartBox />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={cx('charts')}>
                                <PieChartBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
