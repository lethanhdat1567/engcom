import classNames from 'classnames/bind';
import styles from './ReplyItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ReplyItem() {
    const [active, setActive] = useState(false);
    return (
        <div className={cx('wrap')}>
            <div className={cx('res')} onClick={() => setActive(!active)}>
                <span className={cx('res-text')}>
                    3 responses <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} />
                </span>
            </div>
            {active && (
                <div className={cx('item')}>
                    <div className={cx('info')}>
                        <img className={cx('avatar')} src={imgs.unsetAvatar} />
                        <span className={cx('info-name')}>Le thanh Dat</span>
                    </div>
                    <div className={cx('content')}>
                        sdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsadssdasdasdasdsads
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReplyItem;
