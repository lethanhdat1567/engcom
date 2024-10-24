import classNames from 'classnames/bind';
import styles from './ChartBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const cx = classNames.bind(styles);

const data = [
    { date: '2023-10-01', alo: 10 },
    { date: '2023-10-02', alo: 15 },
    { date: '2023-10-03', alo: 20 },
    { date: '2023-10-04', alo: 25 },
    { date: '2023-10-05', alo: 30 },
];

function ChartBox() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <div className={cx('head')}>
                    <FontAwesomeIcon icon={faUser} className="fa-xl" />
                    <p className={cx('title')}>Total Users</p>
                </div>
                <p className={cx('quantity')}>11.112</p>
            </div>
            <div className={cx('right')}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={data}>
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
                        <Line type="monotone" dataKey="alo" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ChartBox;
