import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFirestore from '~/hooks/useFirestore';
import { rooms } from '~/redux/reducer/RoomsSlice';
import ModalCreateRoom from '../ModalCreateRoom/ModalCreateRoom';

const cx = classNames.bind(styles);

function RoomList({ selectedRoomID, setSelectedRoomID }) {
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const roomsValue = useSelector((state) => state.rooms.rooms);

    const [isCreateRoom, setIsCreateRoom] = useState(false);

    // Firebase real time
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: `${user.id}`,
        };
    }, [user.id]);
    const roomsData = useFirestore('rooms', roomsCondition);
    useEffect(() => {
        const serializableRoomsData = roomsData.map((room) => ({
            ...room,
            createdAt: room.createdAt?.toDate().toISOString(),
        }));

        // Dispatch dữ liệu đã chuyển đổi
        dispatch(rooms.actions.getRooms(serializableRoomsData));
    }, [roomsData]);

    const PanelStyle = styled(Panel)`
        &&& {
            .ant-collapse-header,
            p {
                color: white;
            }

            .ant-collapse-content-box {
                padding: 0px 20px;
            }
        }
    `;

    return (
        <>
            <Collapse ghost defaultActiveKey={['1']}>
                <PanelStyle key={1} header="Danh sach cac phong">
                    <div className={cx('room-list')}>
                        {roomsValue.map((item) => {
                            return (
                                <Typography.Link
                                    className={cx('room-item')}
                                    key={item.id}
                                    onClick={() => setSelectedRoomID(item.id)}
                                >
                                    {item.fieldName}
                                </Typography.Link>
                            );
                        })}
                        <Button
                            ghost
                            style={{ margin: '10px 0px', color: '#fff', fontSize: '1.6rem' }}
                            onClick={() => setIsCreateRoom(true)}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} />
                            Them phong
                        </Button>
                    </div>
                </PanelStyle>
            </Collapse>
            <ModalCreateRoom isCreateRoom={isCreateRoom} setIsCreateRoom={setIsCreateRoom} />
        </>
    );
}

export default RoomList;
