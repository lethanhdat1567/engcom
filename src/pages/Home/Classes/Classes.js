import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import CartItem from '~/components/CartItem';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Classes({ data }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header-wrap')}>
                <h2 className={cx('title')}>
                    {data.title}
                    {data.cost && (
                        <span className={cx('sub-title', { cost: data.cost === 'cost' })}>{data.cost}</span>
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
                <div className="col">
                    <CartItem data={data.children} type={data.type} cost={data.cost} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} cost={data.cost} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} cost={data.cost} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} cost={data.cost} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} cost={data.cost} />
                </div>
            </div>
        </div>
    );
}

export default Classes;
