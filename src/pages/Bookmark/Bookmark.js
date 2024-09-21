import classNames from 'classnames/bind';
import styles from './Bookmark.module.scss';
import { Link } from 'react-router-dom';
import BlogsList from '../MyBlogs/BlogsList';

const cx = classNames.bind(styles);

function Bookmark() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h1 className={cx('title')}>My BLogs</h1>
            </div>
            <div className={cx('body')}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className={cx('list-wrap')}>
                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <Link className={cx('item-link')}>Ban nhap</Link>
                                </li>
                            </ul>
                            <div className={cx('seperate')}></div>
                            <BlogsList />
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">sdsd</div>
                </div>
            </div>
        </div>
    );
}

export default Bookmark;
