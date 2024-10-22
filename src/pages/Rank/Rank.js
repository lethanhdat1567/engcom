import classNames from 'classnames/bind';
import styles from './Rank.module.scss';
import './SelectRank.scss';
import { Avatar, Select } from 'antd';
import imgs from '~/assets/Image';
import { kink } from '~/assets/Icon';
import UserRole from '~/components/UserRole/UserRole';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getClassRank, getSubRank } from '~/requestApi/requestRank';
import { handleAvatar } from '~/utils/handleAvatar';
import { handleTime } from '~/utils/handleTime';
import Loading from '~/components/Loading/Loading';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import VideoLoading from '~/components/Loading/VideoLoading/VideoLoading';

const cx = classNames.bind(styles);

function Rank() {
    const [typeFilter, setTypeFilter] = useState('subcribe');
    const [rankValues, setRankValues] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fireworks
    const end = Date.now() + 5 * 1000;
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
            cancelAnimationFrame(animationFrameId);
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
        <div className={cx('wrap-all')}>
            <>
                <Link to={`${process.env.REACT_APP_ROOT}/community`} className={cx('back-wrap')}>
                    <span className={cx('back-icon')}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                    </span>
                    <span className={cx('back-text')}>Back</span>
                </Link>
                <img src={imgs.decor_rank} className={cx('decor-1')} />
                <img src={imgs.decor_rank_2} className={cx('decor-2')} />
                <div className={cx('wrap')}>
                    <h1 className={cx('title-head')}>Exceptional contributors</h1>
                    <div className={cx('rank-wrap')}>
                        {rankValues[1] && (
                            <div className={cx('img-wrap', 'second')}>
                                <img className={cx('img')} src={handleAvatar(rankValues[1]?.avatar)} />
                                <span className={cx('decor')}>{kink}</span>
                            </div>
                        )}
                        {rankValues[0] && (
                            <div className={cx('img-wrap')}>
                                <img className={cx('img')} src={handleAvatar(rankValues[0]?.avatar)} />
                                <span className={cx('decor')}>{kink}</span>
                            </div>
                        )}
                        {rankValues[2] && (
                            <div className={cx('img-wrap', 'second')}>
                                <img className={cx('img')} src={handleAvatar(rankValues[2]?.avatar)} />
                                <span className={cx('decor')}>{kink}</span>
                            </div>
                        )}
                    </div>
                    <p className={cx('desc')}>
                        Thank you to the teachers who have made the most contributions, as well as all the
                        students and teachers who have been using this website. Wishing the community
                        continued growth and the opportunity to learn many new things.
                    </p>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>Top Contributors</h1>
                        <Select
                            defaultValue={typeFilter}
                            onChange={(value) => setTypeFilter(value)}
                            className="select-wrap"
                        >
                            <Select.Option value="subcribe">Most Subcriber</Select.Option>
                            <Select.Option value="class">Most Classes</Select.Option>
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
                                        <th className={cx('item', 'rank', 'user')} scope="col">
                                            User
                                        </th>
                                        <th className={cx('item', 'rank')} scope="col">
                                            {typeFilter === 'subcribe'
                                                ? 'Subscribe number'
                                                : 'Classes number'}
                                        </th>
                                        <th className={cx('item', 'rank')} scope="col">
                                            Date of Participation
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4">
                                                <Skeleton
                                                    height={50}
                                                    count={10}
                                                    style={{ width: '100%', margin: '10px 0px' }}
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {rankValues?.map((item, index) => {
                                                return (
                                                    <tr className={cx('item-wrap')} key={index}>
                                                        <td className={cx('item')}>#{index + 1}</td>
                                                        <td className={cx('item')}>
                                                            <Link
                                                                to={`${process.env.REACT_APP_ROOT}/profile/${item.user_id}`}
                                                                className={cx('user-wrap', 'user')}
                                                            >
                                                                <Avatar
                                                                    className={cx('avatar')}
                                                                    src={handleAvatar(item.avatar)}
                                                                />
                                                                <div className={cx('info-wrap')}>
                                                                    <span className={cx('name')}>
                                                                        {item.name}
                                                                    </span>
                                                                    <UserRole type={item.type} />
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className={cx('item')}>{item.rank_count}</td>
                                                        <td className={cx('item')}>
                                                            {new Date(item.created_at).toLocaleDateString(
                                                                'vi-VN',
                                                                {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                },
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default Rank;
