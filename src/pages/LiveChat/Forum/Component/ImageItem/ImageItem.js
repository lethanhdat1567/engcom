import classNames from 'classnames/bind';
import styles from './ImageItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ImageItem({ src, setImageUrls, index, setImageValues }) {
    const createFileList = (files) => {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;
    };

    // Sửa đổi hàm handleDelete
    const handleDelete = () => {
        // Xóa ảnh từ imageUrls
        setImageUrls((prev) => prev.filter((_, i) => i !== index));

        // Xóa tệp từ imageValues
        setImageValues((prev) => {
            const fileArray = Array.from(prev);
            const newFileArray = fileArray.filter((_, i) => i !== index);
            return createFileList(newFileArray); // Tạo FileList mới từ mảng
        });
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
