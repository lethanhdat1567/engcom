import classNames from 'classnames/bind';
import styles from './ClassMore.module.scss';
import CartItem from '~/components/CartItem';

const cx = classNames.bind(styles);

function ClassMore() {
    const classData = [
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            total: 100,
        },
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            total: 200,
        },
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            total: 200,
        },
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            total: 200,
        },
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            total: 200,
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>All Classes</h2>
            <p className={cx('desc')}>
                These're quality paid classes from teachers on the English Community site.
            </p>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-5">
                    {classData.map((item, index) => (
                        <div className={'col'} key={index}>
                            <CartItem data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClassMore;
