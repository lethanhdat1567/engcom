import classNames from 'classnames/bind';
import styles from './ZoomImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ZoomImage({ isZoomIn, setIsZoomIn, src }) {
    return (
        <div className={cx('zoom', { active: isZoomIn })}>
            <div className={cx('banner')}>
                <img className={cx('img')} src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${src}`} />
            </div>
            <div className={cx('x-mart')} onClick={() => setIsZoomIn(false)}>
                <FontAwesomeIcon icon={faXmark} className="fa-xl" />
            </div>
            <div className={cx('overlay')}></div>
        </div>
    );
}

export default ZoomImage;
