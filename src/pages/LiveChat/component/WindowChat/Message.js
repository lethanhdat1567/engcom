import classNames from 'classnames/bind';
import styles from './WindowChat.module.scss';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);

function Message() {
    return (
        <div className={cx('message')}>
            <div className={cx('message-info')}>
                <Avatar>A</Avatar>
                <div className={cx('message-info-head')}>
                    <span className={cx('user-name')}>Le Thanh Dat</span>
                    <span className={cx('timmer')}>3 mminutes ago</span>
                </div>
            </div>
            <p className={cx('content')}>
                asdsadjsnadnslajdblsajndlusaudlsajbdshiluashdui;asdsadjsnadnslajdblsajndlusaudlsajbdshiluashdui
            </p>
        </div>
    );
}

export default Message;
