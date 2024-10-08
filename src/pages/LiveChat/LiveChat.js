import classNames from 'classnames/bind';
import styles from './LiveChat.module.scss';
import Sidebar from './component/SideBar/Sidebar';
import WindowChat from './component/WindowChat/WindowChat';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LiveChat() {
    const [selectedRoomID, setSelectedRoomID] = useState({});

    return (
        <div className={cx('wrap')}>
            <div className="row g-0">
                <div className="col-3">
                    <Sidebar setSelectedRoomID={setSelectedRoomID} selectedRoomID={selectedRoomID} />
                </div>
                <div className="col-9">
                    <WindowChat setSelectedRoomID={setSelectedRoomID} selectedRoomID={selectedRoomID} />
                </div>
            </div>
        </div>
    );
}

export default LiveChat;
