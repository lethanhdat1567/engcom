import classNames from 'classnames/bind';
import styles from './ClassMore.module.scss';
import CartItem from '~/components/CartItem';
import imgs from '~/assets/Image';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoreClass } from '~/requestApi/requestClass';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';

const cx = classNames.bind(styles);

function ClassMore() {
    const { slug } = useParams();
    const [cartsData, setCartsData] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect(() => {
        setLoading(true);
        getMoreClass(slug)
            .then((res) => {
                setLoading(false);
                setCartsData(res.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [slug]);

    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>All Classes</h2>
            <p className={cx('desc')}>
                These're quality paid classes from teachers on the English Community site.
            </p>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-5">
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => {
                              return (
                                  <div className="col" key={index}>
                                      <CartLoading />
                                  </div>
                              );
                          })
                        : cartsData.map((item, index) => (
                              <div className={'col'} key={index}>
                                  <CartItem data={item} />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default ClassMore;
