import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import CartItem from '~/components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BlogItem from '~/components/BlogItem';

const cx = classNames.bind(styles);

function Classes({ data, title, type, to }) {
    return (
        <div className={cx('wrap-content')}>
            <div className={cx('head-wrap')}>
                <div className={cx('wrap')}>
                    <h2 className={cx('cost')}>{title}</h2>
                    <span className={cx('sub')}>(Top rate)</span>
                </div>
                <Link
                    to={
                        type === 'blog'
                            ? `${process.env.REACT_APP_ROOT}/${to}`
                            : `${process.env.REACT_APP_ROOT}/classes/${to}`
                    }
                    className={cx('link')}
                >
                    See more
                </Link>
            </div>
            <div className={cx('row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5')}>
                {data.map((item, index) => {
                    if (type === 'blog') {
                        return (
                            <div className="col" key={index}>
                                <BlogItem data={item} />
                            </div>
                        );
                    } else {
                        return (
                            <div className="col" key={index}>
                                <CartItem data={item} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Classes;
