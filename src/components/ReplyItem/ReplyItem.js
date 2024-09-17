import classNames from 'classnames/bind';
import styles from './ReplyItem.module.scss';
import imgs from '~/assets/Image';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ReplyItem() {
    return (
        <div className={cx('item')}>
            <div className={cx('info-wrap')}>
                <img className={cx('avatar')} src={imgs.unsetAvatar} />
                <div className={cx('user')}>
                    <h2 className={cx('user-name')}>
                        Datlethanh <span className={cx('timer')}>3 months ago</span>
                    </h2>
                    <p className={cx('content')}>
                        Xin chao, co ai o day khongXin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong ?Xin chao, co ai o day khong
                        ? ?
                    </p>
                </div>
            </div>
            <Tippy
                interactive
                placement="bottom-end"
                trigger="click"
                render={(attrs) => (
                    <div {...attrs} className={cx('drop-wrap')}>
                        <ul className={cx('drop-list')}>
                            <li className={cx('item')}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                Delete
                            </li>
                        </ul>
                    </div>
                )}
            >
                <span className={cx('setting')}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
            </Tippy>
        </div>
    );
}

export default ReplyItem;
