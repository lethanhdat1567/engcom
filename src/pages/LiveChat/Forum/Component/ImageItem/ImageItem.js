import classNames from 'classnames/bind';
import styles from './ImageItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ImageItem({ src, setImageUrls, index, setImageValues }) {
    const handleDelete = () => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
        setImageValues((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={cx('wrap')}>
            <span className={cx('delete')} onClick={handleDelete}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <img src={src} className={cx('img')} />
        </div>
    );
}

export default ImageItem;
