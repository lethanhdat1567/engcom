import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import ClassCart from '~/components/ClassCart/ClassCart';
import imgs from '~/assets/Image';
import { useEffect, useState } from 'react';
import { getMyClass } from '~/requestApi/requestMyClass';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function Classes() {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getMyClass(user.id)
            .then((res) => {
                setClassesData(res);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Your classes</h1>
            {loading ? (
                <Skeleton count={1} height={50} style={{ marginBottom: '20px' }} />
            ) : (
                <p className={cx('desc')}>
                    Bạn có <span className={cx('mark')}>{classesData.length}</span> khóa học của bạn.
                </p>
            )}
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => {
                              return (
                                  <div className="col" key={index}>
                                      <CartLoading />
                                  </div>
                              );
                          })
                        : classesData.map((item, index) => {
                              return (
                                  <div className="col" key={index}>
                                      <ClassCart data={item} />
                                  </div>
                              );
                          })}
                </div>
            </div>
        </div>
    );
}

export default Classes;
