import classNames from 'classnames/bind';
import styles from './TeacherClassOverView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import AnalystItem from '../TeacherClassHome/AnalystItem';
import CartItem from '~/components/CartItem';

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
    return (
        <div className={cx('wrap')}>
            <div className="row row-cols-3">
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
                <CartItem data={{ title: 'test' }} />
            </div>
            <div className={cx('desc-wrap')}>
                <h2 className={cx('desc-title')}>Your description</h2>
                <p className={cx('desc')}>
                    sdsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;ddsadi;ashdfa;hf;d
                </p>
            </div>
        </div>
    );
}

export default TeacherClassOverView;
