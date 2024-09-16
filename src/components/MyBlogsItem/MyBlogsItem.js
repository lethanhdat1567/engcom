import classNames from 'classnames/bind';
import styles from './MyBlogsItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MyBlogsItem() {
    return (
        <div className={cx('blog-item')}>
            <h3 className={cx('blog-title')}>sasasasassaas</h3>
            <div className={cx('author')}>
                <span className={cx('timer')}>Chinh sua 1 gio truoc</span>
                <span className={cx('dot')}></span>
                <span className={cx('timer')}>1 phut doc</span>
            </div>

            <Tippy
                render={(attrs) => (
                    <div {...attrs}>
                        <div className={cx('drop')}>
                            <ul className={cx('drop-list')}>
                                <li className={cx('drop-item')}>Chinh sua</li>
                                <li className={cx('drop-item')}>Xoa</li>
                            </ul>
                        </div>
                    </div>
                )}
                placement="bottom-end"
                trigger="click"
                interactive
            >
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </span>
            </Tippy>
        </div>
    );
}

export default MyBlogsItem;
