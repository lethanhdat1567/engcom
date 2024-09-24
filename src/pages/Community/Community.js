import classNames from 'classnames/bind';
import styles from './Community.module.scss';
import CommuItem from '~/components/CommuteItem/CommuteItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Community() {
    const communityData = [
        {
            title: 'Lo trinh hoc font-end',
            desc: ' Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
            img: imgs.banner1,
            to: '/test',
        },
        {
            title: 'Lo trinh hoc font-end',
            desc: ' Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
            img: imgs.banner1,
            to: '/test',
        },
        {
            title: 'Lo trinh hoc font-end',
            desc: ' Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
            img: imgs.banner1,
            to: '/test',
        },
        {
            title: 'Lo trinh hoc font-end',
            desc: ' Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
            img: imgs.banner1,
            to: '/test',
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Community</h1>
            <p className={cx('desc')}>
                Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị
                trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
            </p>
            <div className={cx('row row-cols-1 row-cols-lg-2 g-5')}>
                {communityData.map((item, index) => {
                    return (
                        <div className={cx('col')} key={index}>
                            <CommuItem data={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Community;
