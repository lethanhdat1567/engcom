import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import extractContent from '~/utils/extractContent';
import { handleAvatar } from '~/utils/handleAvatar';
import Img from '../Img';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    const item = data.blog;
    const user = data.user;
    const { firstImage, content } = extractContent(item.content);
    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/class/1`} className={cx('banner')}>
                <img src={firstImage ? firstImage : imgs.NoImg} className={cx('img')} />
            </Link>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{item.title}</h3>
                <p className={cx('desc')}>{content}</p>
                <div className={cx('footer')}>
                    <Img
                        className={cx('info-avatar')}
                        src={
                            user?.avatar?.includes('googleusercontent.com') ||
                            user?.avatar?.includes('facebook.com')
                                ? user.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                        }
                        alt="User Avatar"
                    />
                    <span className={cx('name')}>{user.user}</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
