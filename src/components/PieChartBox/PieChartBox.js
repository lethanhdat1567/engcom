import classNames from 'classnames/bind';
import styles from './PieChartBox.module.scss';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const cx = classNames.bind(styles);

const COLORS = ['#FFBB28', '#FF8042'];

function PieChartBox({ item }) {
    const data = [
        { name: 'Student', value: item?.students_count, color: '#FFBB28' },
        { name: 'Teacher', value: item?.teacher_count, color: '#FF8042' },
    ];
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
                                <p className={cx('options-title')}>
                                    {item.name}: {item.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PieChartBox;
