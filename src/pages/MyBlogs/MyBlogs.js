import classNames from 'classnames/bind';
import styles from './MyBlogs.module.scss';
import { Link } from 'react-router-dom';
import BlogsList from './BlogsList';

const cx = classNames.bind(styles);

function MyBlogs() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h1 className={cx('title')}>My BLogs</h1>
            </div>
            <div className={cx('body')}>
                <div className="row">
                    <div className="col-8">
                        <div className={cx('list-wrap')}>
                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <Link className={cx('item-link')}>Ban nhap</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link className={cx('item-link')}>Ban nhap</Link>
                                </li>
                            </ul>
                            <div className={cx('seperate')}></div>
                        </div>
                        <BlogsList />
                    </div>
                    <div className="col-4">sdsd</div>
                </div>
            </div>
        </div>
    );
}

export default MyBlogs;
