import classNames from 'classnames/bind';
import styles from './Rank.module.scss';
import { Avatar, Select } from 'antd';
import imgs from '~/assets/Image';
import { kink } from '~/assets/Icon';
import UserRole from '~/components/UserRole/UserRole';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Rank() {
    const [typeFilter, setTypeFilter] = useState('subcribe');

    useEffect(() => {
        const interID = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: 0, y: 0.6 },
            });

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: 1, y: 0.6 },
            });
        }, 2500);

        return () => {
            clearInterval(interID);
        };
    }, []);

    useEffect(() => {
        console.log(typeFilter);
    }, [typeFilter]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('rank-wrap')}>
                <div className={cx('img-wrap', 'second')}>
                    <img className={cx('img')} src={imgs.unsetAvatar} />
                    <span className={cx('decor')}>{kink}</span>
                </div>
                <div className={cx('img-wrap')}>
                    <img className={cx('img')} src={imgs.unsetAvatar} />
                    <span className={cx('decor')}>{kink}</span>
                </div>
                <div className={cx('img-wrap', 'second')}>
                    <img className={cx('img')} src={imgs.unsetAvatar} />
                    <span className={cx('decor')}>{kink}</span>
                </div>
            </div>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Top Contributors</h1>
                <Select
                    defaultValue={typeFilter}
                    onChange={(value) => setTypeFilter(value)}
                    className={cx('select-wrap')}
                >
                    <Select.Option value="subcribe">Most Subcriber</Select.Option>
                    <Select.Option value="classes">Most Classes</Select.Option>
                </Select>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-head')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr className={cx('item-wrap', 'head')}>
                                <th className={cx('item', 'rank')} scope="col">
                                    Rank
                                </th>
                                <th className={cx('item', 'rank')} scope="col">
                                    User
                                </th>
                                <th className={cx('item')} scope="col">
                                    Subscribe Number
                                </th>
                                <th className={cx('item')} scope="col">
                                    Date of Participation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={cx('item-wrap')}>
                                <td className={cx('item')}>#1</td>
                                <td className={cx('item')}>
                                    <div className={cx('user-wrap')}>
                                        <Avatar>A</Avatar>
                                        <div className={cx('info-wrap')}>
                                            <span className={cx('name')}>Le Thanh Dat</span>
                                            <UserRole type={3} />
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('item')}>1000</td>
                                <td className={cx('item')}>2024-01-01</td>
                            </tr>
                            <tr className={cx('item-wrap')}>
                                <td className={cx('item')}>#1</td>
                                <td className={cx('item')}>
                                    <div className={cx('user-wrap')}>
                                        <Avatar>A</Avatar>
                                        <div className={cx('info-wrap')}>
                                            <span className={cx('name')}>Le Thanh Dat</span>
                                            <UserRole type={3} />
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('item')}>1000</td>
                                <td className={cx('item')}>2024-01-01</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Rank;
