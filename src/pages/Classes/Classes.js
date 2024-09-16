import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import ClassCart from '~/components/ClassCart/ClassCart';

const cx = classNames.bind(styles);

function Classes() {
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Your classes</h1>
            <p className={cx('desc')}>
                Bạn đã hoàn thành <span className={cx('mark')}>3/8</span> khóa học của bạn.
            </p>
            <div className={cx('body')}>
                <div className="row row-cols-4">
                    <div className="col">
                        <ClassCart />
                    </div>
                    <div className="col">
                        <ClassCart />
                    </div>
                    <div className="col">
                        <ClassCart />
                    </div>
                    <div className="col">
                        <ClassCart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classes;
