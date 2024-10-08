import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Col, Row } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';

const cx = classNames.bind(styles);

function Sidebar({ setSelectedRoomID, selectedRoomID }) {
    return (
        <Row className={cx('side-bar')}>
            <Col span={24}>
                <UserInfo />
                <RoomList setSelectedRoomID={setSelectedRoomID} selectedRoomID={selectedRoomID} />
            </Col>
        </Row>
    );
}

export default Sidebar;
