import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import CartItem from '~/components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BlogItem from '~/components/BlogItem';

const cx = classNames.bind(styles);

function Classes({ data }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h2 className={cx('title')}>
                    {data.title}
                    {data.price && (
                        <span className={cx('sub-title', { cost: data.price === 'cost' })}>{data.price}</span>
                    )}
                </h2>
                <div className={cx('see-wrap')}>
                    <Link className={cx('link')}>See all</Link>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faChevronRight} className="fa-sm" />
                    </span>
                </div>
            </div>
            <div className="row row-cols-4 g-5">
                {data.type === 'class' &&
                    data.children.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <CartItem data={item} />
                            </div>
                        );
                    })}
                {data.type === 'blogs' &&
                    data.children.map((item, index) => {
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
