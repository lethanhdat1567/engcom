import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import imgs from '~/assets/Image';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <div className="row row-cols-1 row-cols-lg-2 g-5">
                    <div className="col">
                        <div className={cx('right')}>
                            <img src={imgs.notFound} className={cx('img')} />
                        </div>
                    </div>
                    <div className="col">
                        <div className={cx('left')}>
                            <div className={cx('left-head')}>
                                <h1 className={cx('title')}>NOT FOUND</h1>
                                <p className={cx('desc')}>404 ERROR!</p>
                                <p className={cx('desc-sub')}>
                                    The page you are looking for does not exist. You can go back with a button
                                    below
                                </p>
                            </div>
                            <Link to={`${process.env.REACT_APP_ROOT}`}>
                                <Button save>GO BACK HOME</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
