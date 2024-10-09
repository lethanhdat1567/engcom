import classNames from 'classnames/bind';
import styles from './LiveChat.module.scss';
import Sidebar from './component/SideBar/Sidebar';
import WindowChat from './component/WindowChat/WindowChat';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LiveChat() {
    const [selectedRoomID, setSelectedRoomID] = useState();
    const [isShowNav, setIsShowNav] = useState(false);

    return (
        <div className={cx('wrap')}>
            <div className="row g-0">
                <div className="col-3">
                    <Sidebar
                        isShowNav={isShowNav}
                        setIsShowNav={setIsShowNav}
                        setSelectedRoomID={setSelectedRoomID}
                        selectedRoomID={selectedRoomID}
                    />
                </div>
                <div className="col-12 col-md-9">
                    <WindowChat
                        isShowNav={isShowNav}
                        setIsShowNav={setIsShowNav}
                        setSelectedRoomID={setSelectedRoomID}
                        selectedRoomID={selectedRoomID}
                    />
                </div>
            </div>
        </div>
    );
}

export default LiveChat;
