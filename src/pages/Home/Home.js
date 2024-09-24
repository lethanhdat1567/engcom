import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import SliderBanner from './SliderBanner';
import Classes from './Classes';
import imgs from '~/assets/Image';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase/config';

const cx = classNames.bind(styles);

function Home() {
    const BlogsData = [
        {
            title: 'Blogs',
            children: [
                {
                    title: 'Day la bai blogs nhe!',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                    ],
                },
                {
                    title: 'Day la bai blogs nhe!',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                    ],
                },
                {
                    title: 'Day la bai blogs nhe!',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                    ],
                },
                {
                    title: 'Day la bai blogs nhe!',
                    info: [
                        {
                            user: 'Le Thanh Dat',
                            img: imgs.unsetAvatar, // Avatar lay tu BE
                        },
                        {
                            view: '16.000',
                        },
                    ],
                },
            ],
        },
    ];
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

    return (
        <>
            {/* <Loading /> */}
            <div className={cx('home')}>
                <div className={cx('banner')}>
                    <SliderBanner />
                </div>
                <div className="container">
                    <div className={cx('content')}>
                        {Cartsdata.map((item, index) => {
                            return <Classes cartData={item} key={index} />;
                        })}
                        {BlogsData.map((item, index) => {
                            return <Classes BlogData={item} key={index} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
