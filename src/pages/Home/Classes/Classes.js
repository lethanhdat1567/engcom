import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import CartItem from '~/components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BlogItem from '~/components/BlogItem';

const cx = classNames.bind(styles);

function Classes({ cartData, BlogData }) {
    const headTitle = cartData?.title || BlogData?.title;
    const headPrice = cartData?.price;
    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h2 className={cx('title')}>
                    {headTitle}
                    {headPrice && (
                        <span className={cx('sub-title', { cost: headPrice === 'cost' })}>{headPrice}</span>
                    )}
                </h2>
                <div className={cx('see-wrap')}>
                    <Link className={cx('link')} to={`${process.env.REACT_APP_ROOT}/classes/1`}>
                        See all
                    </Link>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faChevronRight} className="fa-sm" />
                    </span>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-5">
                {cartData &&
                    cartData.children.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <CartItem data={item} />
                            </div>
                        );
                    })}
                {BlogData &&
                    BlogData.children.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <BlogItem data={item} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Classes;
