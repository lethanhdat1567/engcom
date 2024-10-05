import classNames from 'classnames/bind';
import styles from './SearchMore.module.scss';
import User from './User';
import Classes from './Classes';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requestSearch } from '~/requestApi/requestSearch';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function SearchMore() {
    const query = useQuery();
    const q = query.get('q');

    const navData = ['Users', 'Classes'];
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [classData, setClassData] = useState([]);
    const [navIndex, setNavIndex] = useState(0);
    const contentNav = [<User userData={userData} />, <Classes classData={classData} />];

    useEffect(() => {
        setLoading(true);
        try {
            requestSearch(q, 'more')
                .then((res) => {
                    setLoading(false);
                    setUserData(res[0]);
                    setClassData(res[1]);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [q]);
    return (
        <div className={cx('wrap')}>
            <nav className={cx('nav')}>
                {navData.map((item, index) => {
                    return (
                        <div
                            className={cx('nav-item', { active: navIndex === index })}
                            key={index}
                            onClick={() => setNavIndex(index)}
                        >
                            {item}
                        </div>
                    );
                })}
            </nav>
            <div className={cx('body')}>
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => {
                          return (
                              <Skeleton count={1} height={60} style={{ margin: '10px 0px' }} key={index} />
                          );
                      })
                    : contentNav[navIndex]}
            </div>
        </div>
    );
}

export default SearchMore;
