import classNames from 'classnames/bind';
import styles from './ClassMore.module.scss';
import CartItem from '~/components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ClassMore() {
    const classData = [
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            children: [
                {
                    title: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
                },
                {
                    title: '16.000',
                    leftIcon: <FontAwesomeIcon icon={faUsers} />,
                },
                {
                    title: '5',
                    leftIcon: <FontAwesomeIcon icon={faBook} />,
                },
            ],
        },
        {
            title: 'Pro classes',
            type: 'cart',
            cost: 'cost',
            children: [
                {
                    title: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
                },
                {
                    title: '16.000',
                    leftIcon: <FontAwesomeIcon icon={faUsers} />,
                },
                {
                    title: '5',
                    leftIcon: <FontAwesomeIcon icon={faBook} />,
                },
            ],
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>All Classes</h2>
            <p className={cx('desc')}>
                These're quality paid classes from teachers on the English Community site.
            </p>
            <div className={cx('body')}>
                <div className="row row-cols-4">
                    {classData.map((item, index) => (
                        <div className={'col'} key={index}>
                            <CartItem data={item.children} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClassMore;
