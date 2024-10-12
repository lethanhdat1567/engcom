import classNames from 'classnames/bind';
import styles from './Rank.module.scss';
import { Avatar, Select } from 'antd';
import imgs from '~/assets/Image';
import { kink } from '~/assets/Icon';
import UserRole from '~/components/UserRole/UserRole';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { getClassRank, getSubRank } from '~/requestApi/requestRank';
import { handleAvatar } from '~/utils/handleAvatar';
import { handleTime } from '~/utils/handleTime';

const cx = classNames.bind(styles);

function Rank() {
    const [typeFilter, setTypeFilter] = useState('subcribe');
    const [rankValues, setRankValues] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fireworks
    const end = Date.now() + 5 * 1000; // 15 seconds
    const colors = ['#bb0000', '#ffffff'];
    let animationFrameId;
    useEffect(() => {
        if (!loading) {
            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });

                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    animationFrameId = requestAnimationFrame(frame);
                }
            };

            frame();
        }
        return () => {
            cancelAnimationFrame(animationFrameId); // Dừng hiệu ứng khi unmount
        };
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        if (typeFilter === 'subcribe') {
            getSubRank()
                .then((res) => {
                    setRankValues(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            getClassRank()
                .then((res) => {
                    setRankValues(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [typeFilter]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('rank-wrap')}>
                {loading ? (
                    <div className={cx('load')}>
                        {Array.from({ length: 3 }).map((_, index) => {
                            return (
                                <div className={cx('load-img')} key={index}>
                                    <Skeleton height={150} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <>
                        <div className={cx('img-wrap', 'second')}>
                            <img className={cx('img')} src={handleAvatar(rankValues[2].avatar)} />
                            <span className={cx('decor')}>{kink}</span>
                        </div>
                        <div className={cx('img-wrap')}>
                            <img className={cx('img')} src={handleAvatar(rankValues[0].avatar)} />
                            <span className={cx('decor')}>{kink}</span>
                        </div>
                        <div className={cx('img-wrap', 'second')}>
                            <img className={cx('img')} src={handleAvatar(rankValues[3].avatar)} />
                            <span className={cx('decor')}>{kink}</span>
                        </div>
                    </>
                )}
            </div>
            {!loading && (
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Top Contributors</h1>
                    <Select
                        defaultValue={typeFilter}
                        onChange={(value) => setTypeFilter(value)}
                        className={cx('select-wrap')}
                    >
                        <Select.Option value="subcribe">Most Subcriber</Select.Option>
                        <Select.Option value="class">Most Classes</Select.Option>
                    </Select>
                </div>
            )}
            <div className={cx('body')}>
                <div className={cx('body-head')}>
                    {loading ? (
                        <span style={{ width: '100%', display: 'block' }}>
                            <Skeleton height={40} count={10} width="100%" style={{ margin: '10px 0px' }} />
                        </span>
                    ) : (
                        <table className={cx('table')}>
                            <thead>
                                <tr className={cx('item-wrap', 'head')}>
                                    <th className={cx('item', 'rank')} scope="col">
                                        Rank
                                    </th>
                                    <th className={cx('item', 'rank', 'user')} scope="col">
                                        User
                                    </th>
                                    <th className={cx('item')} scope="col">
                                        {typeFilter === 'subcribe' ? 'Subscribe number' : 'Classes number'}
                                    </th>
                                    <th className={cx('item')} scope="col">
                                        Date of Participation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankValues?.map((item, index) => {
                                    console.log(item.name);

                                    return (
                                        <tr className={cx('item-wrap')} key={index}>
                                            <td className={cx('item')}>#{index + 1}</td>
                                            <td className={cx('item')}>
                                                <div className={cx('user-wrap', 'user')}>
                                                    <Avatar
                                                        className={cx('avatar')}
                                                        src={handleAvatar(item.avatar)}
                                                    />
                                                    <div className={cx('info-wrap')}>
                                                        <span className={cx('name')}>{item.name}</span>
                                                        <UserRole type={item.type} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={cx('item')}>{item.rank_count}</td>
                                            <td className={cx('item')}>
                                                {new Date(item.created_at).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Rank;
