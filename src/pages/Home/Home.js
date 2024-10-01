import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import SliderBanner from './SliderBanner';
import Classes from './Classes';
import imgs from '~/assets/Image';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase/config';
import { useEffect, useState } from 'react';
import { getAllClasses } from '~/requestApi/requestClass';
import CartItem from '~/components/CartItem';
import { Link } from 'react-router-dom';
import { readAllBlogs } from '~/requestApi/requestBlog';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.user.user);

    const [cartsCost, setCartsCost] = useState([]);
    const [cartsPrivate, setCartPrivate] = useState([]);
    const [cartsPublic, setCartPublic] = useState([]);
    const [blogsData, setBlogsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const Cartsdata = [
        {
            title: 'Pro classes',
            type: 'cost',
            children: [
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                    price: 200,
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                    price: 200,
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                    price: 200,
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                    price: 200,
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Free classes',
            type: 'free',
            children: [
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                        {
                            comment: '5',
                        },
                    ],
                },
            ],
        },
    ];

    useEffect(() => {
        setLoading(true);
        getAllClasses()
            .then((res) => {
                setCartsCost([...res.data.cost]);
                setCartPrivate([...res.data.private]);
                setCartPublic([...res.data.public]);

                readAllBlogs()
                    .then((res) => {
                        setLoading(false);
                        setBlogsData(res.data);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <>
            {/* <Loading /> */}
            <div className={cx('home')}>
                {user.role_id === 2 && (
                    <div className={cx('banner')}>
                        <SliderBanner />
                    </div>
                )}
                <div className="container">
                    {loading ? (
                        <div className={cx('loading')}>
                            <div
                                className={cx('row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5')}
                            >
                                {Array.from({ length: 8 }).map((_, index) => {
                                    return (
                                        <div className="col" key={index}>
                                            <CartLoading />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className={cx('content')}>
                            <Classes data={cartsCost} title="COST CLASSES" to="cost" />
                            <Classes data={cartsPrivate} title="PRIVATE CLASSES" to="private" />
                            <Classes data={cartsPublic} title="PUBLIC CLASSES" to="public" />
                            <Classes data={blogsData} title="BLOGS" type="blog" to="blogs" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
