import classNames from 'classnames/bind';
import styles from './TeachderHome.module.scss';
import SliderBanner from '../Home/SliderBanner';
import Classes from '../Classes/Classes';
import EmptyCart from './EmptyCart';
import CartItem from '~/components/CartItem';
import imgs from '~/assets/Image';
import { useEffect, useState } from 'react';
import { getClasses } from '~/requestApi/requestClass';
import { useSelector } from 'react-redux';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherHome() {
    const user = useSelector((state) => state.user.user);
    const [Cartsdata, setCartsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getClasses(user.id)
            .then((res) => {
                setCartsData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className={cx('home')}>
            <div className={cx('banner')}>
                <SliderBanner />
            </div>
            <div className="container">
                <div className={cx('content')}>
                    <h1 className={cx('title')}>Your class</h1>
                    <div className={cx('classes')}>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
                            <div className="col">
                                <EmptyCart />
                            </div>
                            {loading &&
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div className="col" key={index}>
                                        <CartLoading />
                                    </div>
                                ))}
                            {Cartsdata.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <CartItem create data={item} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherHome;
