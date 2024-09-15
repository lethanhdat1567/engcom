import classNames from 'classnames/bind';
import styles from './Community.module.scss';
import CommuItem from '~/components/CommuteItem/CommuteItem';

const cx = classNames.bind(styles);

function Community() {
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Community</h1>
            <p className={cx('desc')}>
                Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị
                trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
            </p>
            <div className={cx('row row-cols-2 g-5')}>
                <div className={cx('col')}>
                    <CommuItem />
                </div>
                <div className={cx('col')}>
                    <CommuItem />
                </div>
                <div className={cx('col')}>
                    <CommuItem />
                </div>
                <div className={cx('col')}>
                    <CommuItem />
                </div>
            </div>
        </div>
    );
}

export default Community;
