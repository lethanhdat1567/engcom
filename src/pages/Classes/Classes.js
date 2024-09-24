import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import ClassCart from '~/components/ClassCart/ClassCart';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Classes() {
    const classData = [
        {
            title: 'Khoa hoc tieng anh cap toc',
            total: 100,
            price: 200,
            info: [
                {
                    user: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
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
                    img: imgs.unsetAvatar,
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
                    img: imgs.unsetAvatar,
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
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Your classes</h1>
            <p className={cx('desc')}>
                Bạn đã hoàn thành <span className={cx('mark')}>3/8</span> khóa học của bạn.
            </p>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
                    {classData.map((item, index) => {
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
