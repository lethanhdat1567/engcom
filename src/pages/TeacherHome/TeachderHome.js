import classNames from 'classnames/bind';
import styles from './TeachderHome.module.scss';
import SliderBanner from '../Home/SliderBanner';
import Classes from '../Classes/Classes';
import EmptyCart from './EmptyCart';
import CartItem from '~/components/CartItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function TeacherHome() {
    const Cartsdata = [
        {
            title: 'Khoa hoc tieng anh cap toc',
            banner: imgs.profileBanner,
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
            banner: imgs.profileBanner,
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
            banner: imgs.profileBanner,
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
            banner: imgs.profileBanner,
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
    ];
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
                            {Cartsdata.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <CartItem data={item} />
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
