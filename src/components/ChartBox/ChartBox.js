import classNames from 'classnames/bind';
import styles from './ChartBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ChartBox({ data }) {
    const dataAnalysis = data.daily;
    console.log(data);

    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <div className={cx('head')}>
                    <FontAwesomeIcon icon={data.title === 'Classes' ? faBook : faUsers} className="fa-xl" />
                    <p className={cx('title')}>Total {data?.title}</p>
                </div>
                <p className={cx('quantity')}>{data.total}</p>
            </div>
            <div className={cx('right')}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={dataAnalysis}>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div
                                            className={cx('info-wrap')}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                padding: '5px',
                                            }}
                                        >
                                            <p>{`Date: ${payload[0].payload.date}`}</p>
                                            <p>{`Users: ${payload[0].value}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ChartBox;
