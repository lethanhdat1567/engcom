import classNames from 'classnames/bind';
import styles from './CommuteItem.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CommuItem() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>Lộ trình học Front-end</h2>
                    <p className={cx('desc')}>
                        Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ
                        chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                    </p>
                </div>
                <Link to={cx('img-wrap')}>
                    <img
                        className={cx('img')}
                        src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                    />
                </Link>
            </div>
            <Button primary classNames={cx('btn')}>
                More detail
            </Button>
        </div>
    );
}

export default CommuItem;
