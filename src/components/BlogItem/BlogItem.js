import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/class/1`} className={cx('banner')}>
                <img src={imgs.cartImg} className={cx('img')} />
            </Link>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{data.title}</h3>
                {/* <div className={cx('footer')}>
                    {data?.info?.map((item, index) => {
                        return <InfoItem data={item} key={index} />;
                    })}
                </div> */}
            </div>
        </div>
    );
}

export default CartItem;
