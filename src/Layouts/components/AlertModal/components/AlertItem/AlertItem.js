import classNames from 'classnames/bind';
import styles from './AlertItem.module.scss';
import imgs from '~/assets/Image';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function AlertItem() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('wrap')}>
            <div className={cx('head')}>
                <h3 className={cx('title')}>
                    <span className={cx('decor')}>#</span>"Try Hard" Cùng Lớp Học Offline Tại Hà Nội - Ai Sợ
                    Thì Đi Về!
                </h3>
                {user.role_id === 4 && (
                    <Tippy content="Delete content">
                        <span className={cx('delete-icon')}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} className="fa-lg" />
                        </span>
                    </Tippy>
                )}
            </div>
            <img src={imgs.banner1} className={cx('img')} />
            <p className={cx('desc')}>
                Lưu ý: Lớp học offline dành cho những bạn xác định "all in" với nghề. Không dành cho các bạn
                nghĩ "học offline cho dễ học" nhé. Vì để đáp ứng cho đầu vào doanh nghiệp hiện nay, kiến thức
                học sẽ thử thách và nâng cao - đòi hỏi bạn phải là người có tính nỗ lực, dám đầu tư thời gian
                và công sức!
            </p>
        </div>
    );
}

export default AlertItem;
