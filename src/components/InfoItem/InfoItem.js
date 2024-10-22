import classNames from 'classnames/bind';
import styles from './InfoItem.module.scss';
import { Link } from 'react-router-dom';
import Img from '../Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function InfoItem({ data, className, large = false }) {
    if (data) {
        return (
            <div className={cx('wrap-body')}>
                <Link to={`${process.env.REACT_APP_ROOT}/profile/${data.user.user_id}`}>
                    <div className={cx('wrap', className)}>
                        <Img
                            className={cx('img')}
                            src={
                                data.user?.avatar?.includes('googleusercontent.com') ||
                                data.user?.avatar?.includes('facebook.com')
                                    ? data.user?.avatar
                                    : `${process.env.REACT_APP_BACKEND_UPLOAD}/${data.user?.avatar}`
                            }
                            alt="User Avatar"
                        />
                        <p className={cx('info')}>{data.user?.name}</p>
                    </div>
                </Link>
                <div className={cx('wrap')}>
                    <FontAwesomeIcon icon={faUser} />
                    <p className={cx('info')}>{data.subscribe_count}</p>
                </div>
                <div className={cx('wrap')}>
                    <FontAwesomeIcon icon={faComment} />
                    <p className={cx('info')}>{data.comment_count}</p>
                </div>
            </div>
        );
    }
}

export default InfoItem;
