import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import CartItem from '~/components/CartItem';

const cx = classNames.bind(styles);

function Classes({ data }) {
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>{data.title}</h2>
            <div className="row row-cols-4 g-5">
                <div className="col">
                    <CartItem data={data.children} type={data.type} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} />
                </div>
                <div className="col">
                    <CartItem data={data.children} type={data.type} />
                </div>
            </div>
        </div>
    );
}

export default Classes;
