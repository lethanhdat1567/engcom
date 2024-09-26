import classNames from 'classnames/bind';
import styles from './TeacherClassOverView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import AnalystItem from '../TeacherClassHome/AnalystItem';
import CartItem from '~/components/CartItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TeacherClassOverView() {
    const AnaData = [
        {
            title: 'Users',
            icon: <FontAwesomeIcon icon={faUser} className="fa-lg" />,
            total: '16.203',
        },
        {
            title: 'Comments',
            icon: <FontAwesomeIcon icon={faComment} className="fa-lg" />,
            total: '16.203',
        },
        {
            title: 'Total',
            icon: <FontAwesomeIcon icon={faMoneyBill1} className="fa-lg" />,
            total: '16.203$',
        },
    ];

    const cartData = useSelector((state) => state.teacher.carts);
    return (
        <div className={cx('wrap')}>
            <div className="row row-cols-1 row-cols-md-3 g-5">
                {AnaData.map((item, index) => {
                    return (
                        <div className="col" key={index}>
                            <AnalystItem item={item} />
                        </div>
                    );
                })}
            </div>
            <h1 className={cx('title')}>Your class cart</h1>
            <div className={cx('cart-wrap')}>
                <CartItem data={cartData} />
            </div>
            <div className={cx('desc-wrap')}>
                <h2 className={cx('desc-title')}>Your description</h2>
                <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: cartData.desc }}></div>
            </div>
        </div>
    );
}

export default TeacherClassOverView;
