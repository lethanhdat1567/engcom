import classNames from 'classnames/bind';
import styles from './PieChartBox.module.scss';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const cx = classNames.bind(styles);

const data = [
    { name: 'Group A', value: 400, color: '#0088FE' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 300, color: '#FFBB28' },
    { name: 'Group D', value: 200, color: '#FF8042' },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PieChartBox() {
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Leads by Sourse</h2>
            <div className={cx('chart')}>
                <ResponsiveContainer>
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={cx('options')}>
                {data.map((item, index) => {
                    return (
                        <div className={cx('item')} key={index}>
                            <div className={cx('decor')} style={{ backgroundColor: `${item.color}` }}></div>
                            <div className={cx('options-info')}>
                                <p className={cx('options-title')}>{item.name}</p>
                                <p className={cx('options-quantiy')}>{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PieChartBox;
