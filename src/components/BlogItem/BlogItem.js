import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';
import imgs from '~/assets/Image';
import extractContent from '~/utils/extractContent';
import Img from '../Img';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    const item = data.blog;
    const user = data.user;
    const { content } = extractContent(item.content);

    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/blogs/${item.id}`} className={cx('banner')}>
                <img
                    src={
                        item.thumbnail
                            ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${item.thumbnail}`
                            : imgs.NoImg
                    }
                    className={cx('img')}
                />
            </Link>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{item.title}</h3>
                <p className={cx('desc')}>{content}</p>
                <div className={cx('footer')}>
                    <Img
                        className={cx('info-avatar')}
                        src={
                            user.img?.includes('googleusercontent.com') || user.img?.includes('facebook.com')
                                ? user.img
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.img}`
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
