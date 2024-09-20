import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import SliderBanner from './SliderBanner';
import Classes from './Classes';
import Role from '~/components/Role/Role';

const cx = classNames.bind(styles);

function Home() {
    const data = [
        {
            title: 'Pro classes',
            type: 'class',
            price: 'cost',
            children: [
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 100,
                },
            ],
        },
        {
            title: 'Free classes',
            type: 'class',
            price: 'free',
            children: [
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 0,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 0,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 0,
                },
                {
                    title: 'Khoa hoc tieng anh cap toc',
                    total: 0,
                },
            ],
        },
        {
            title: 'Blogs',
            type: 'blogs',
            children: [
                {
                    title: 'Day la bai blogs nhe!',
                },
                {
                    title: 'Day la bai blogs nhe!',
                },
                {
                    title: 'Day la bai blogs nhe!',
                },
                {
                    title: 'Day la bai blogs nhe!',
                },
            ],
        },
    ];
    return (
        <>
            {/* <Role /> */}
            <div className={cx('home')}>
                <div className={cx('banner')}>
                    <SliderBanner />
                </div>
                <div className="container">
                    <div className={cx('content')}>
                        {data.map((item, index) => {
                            return <Classes data={item} key={index} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
