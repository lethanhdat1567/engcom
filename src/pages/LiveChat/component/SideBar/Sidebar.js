import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Button, Col, Row } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import UserInfoNav from './UserInfoNav';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalInvite from '../ModalInvite/ModalInvite';

const cx = classNames.bind(styles);

function Sidebar({ setSelectedRoomID, selectedRoomID, isShowNav, setIsShowNav }) {
    const [isShowInviteModal, setIsShowInviteModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const rooms = useSelector((state) => state.rooms.rooms);
    useEffect(() => {
        if (selectedRoomID) {
            const roomsValue = rooms.find((item) => item.id == selectedRoomID);
            setSelectedRoom(roomsValue);
        }
    }, [rooms, selectedRoomID]);

    return (
        <>
            <Row className={cx('side-bar', { active: isShowNav })}>
                <Col span={24}>
                    <UserInfo isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
                    <RoomList setSelectedRoomID={setSelectedRoomID} selectedRoomID={selectedRoomID} />
                    <div className={cx('invite-head')} onClick={() => setIsShowInviteModal(true)}>
                        <Button ghost icon={<FontAwesomeIcon icon={faUserPlus} />} style={{ width: '100%' }}>
                            Invite
                        </Button>
                    </div>
                </Col>
            </Row>
            <div className={cx('over-lay', { active: isShowNav })} onClick={() => setIsShowNav(false)}></div>
            <ModalInvite
                isShowInviteModal={isShowInviteModal}
                setIsShowInviteModal={setIsShowInviteModal}
                curMembers={selectedRoom?.members}
                selectedRoomID={selectedRoomID}
            />
        </>
    );
}

export default Sidebar;
