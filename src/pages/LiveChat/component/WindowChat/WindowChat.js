import classNames from 'classnames/bind';
import styles from './WindowChat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import Message from './Message';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import request from '~/utils/request';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function WindowChat({ selectedRoomID, setSelectedRoomID }) {
    const rooms = useSelector((state) => state.rooms.rooms);
    const user = useSelector((state) => state.user.user);

    const [allUserData, setAllUserData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});

    useEffect(() => {
        if (selectedRoomID) {
            const roomsValue = rooms.find((item) => item.id === selectedRoomID);
            setSelectedRoom(roomsValue);

            setAllUserData([]);
            roomsValue?.members?.forEach((item) => {
                request
                    .get(`engcom/customer/${item}`)
                    .then((res) => {
                        const newUser = res.data.data;
                        setAllUserData((prev) => {
                            const isUserExist = prev.some((user) => user.id === newUser.id);
                            if (!isUserExist) {
                                return [...prev, newUser];
                            }
                            return prev;
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }
    }, [rooms, selectedRoomID]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('head-info')}>
                    <span className={cx('head-title')}>{selectedRoom?.fieldName}</span>
                    <span className={cx('head-sub')}>{selectedRoom?.description} </span>
                </div>
                <div className={cx('invite-wrap')}>
                    <Button icon={<FontAwesomeIcon icon={faUserPlus} />}>Invite</Button>
                    <Avatar.Group size="medium" max={{ count: 2 }}>
                        {allUserData?.map((item, index) => {
                            return (
                                <Tooltip title={item.name} key={item.id}>
                                    <Img
                                        className={cx('avatar')}
                                        src={
                                            item?.avatar?.includes('googleusercontent.com') ||
                                            item?.avatar?.includes('facebook.com')
                                                ? item?.avatar
                                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${item?.avatar}`
                                        }
                                    ></Img>
                                </Tooltip>
                            );
                        })}
                    </Avatar.Group>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('message')}>
                    <Message />
                </div>
                <Form>
                    <div className={cx('send-wrap')}>
                        <Form.Item className={cx('send-input-wrap')}>
                            <Input
                                variant={false}
                                autoComplete="off"
                                className={cx('send-input')}
                                placeholder="Nhap tin nhan...."
                            />
                        </Form.Item>
                        <button className={cx('send-submit')}>Gui</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default WindowChat;
