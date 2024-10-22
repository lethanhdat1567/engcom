import classNames from 'classnames/bind';
import styles from './WindowChat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Alert, Avatar, Button, Flex, Form, Input, Tooltip } from 'antd';
import Message from './Message';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import request from '~/utils/request';
import Img from '~/components/Img';
import ModalInvite from '../ModalInvite/ModalInvite';
import { addDocument } from '~/firebase/service';
import useFirestore from '~/hooks/useFirestore';
import TextareaAutosize from 'react-textarea-autosize';

const cx = classNames.bind(styles);

function WindowChat({ selectedRoomID, setSelectedRoomID, isShowNav, setIsShowNav }) {
    const rooms = useSelector((state) => state.rooms.rooms);
    const user = useSelector((state) => state.user.user);

    const [allUserData, setAllUserData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [chatValue, setChatValue] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [isShowInviteModal, setIsShowInviteModal] = useState(false);

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

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.trim()) {
            setChatValue(value);
            setAllowSubmit(true);
        } else {
            setChatValue('');
            setAllowSubmit(false);
        }
    };

    const handleSubmit = () => {
        if (allowSubmit) {
            addDocument('messages', {
                text: chatValue,
                id: user.id,
                avatar: user.avatar,
                roomId: selectedRoomID,
                name: user.name,
            });
            setChatValue('');
            setAllowSubmit(false);
        }
    };

    const condition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom?.id,
        };
    }, [selectedRoom?.id]);

    const messages = useFirestore('messages', condition);

    return (
        <>
            <div className={cx('wrap')}>
                {selectedRoomID ? (
                    <div className={cx('header')}>
                        <button className={cx('bar-btn')} onClick={() => setIsShowNav(true)}>
                            <FontAwesomeIcon icon={faBars} className="fa-lg" />
                        </button>
                        <div className={cx('head-info')}>
                            <span className={cx('head-title')}>{selectedRoom?.fieldName}</span>
                            <span className={cx('head-sub')}>{selectedRoom?.description} </span>
                        </div>
                        <div className={cx('invite-wrap')}>
                            <div className={cx('invite-head')}>
                                <Button
                                    icon={<FontAwesomeIcon icon={faUserPlus} />}
                                    onClick={() => setIsShowInviteModal(true)}
                                >
                                    Invite
                                </Button>
                            </div>
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
                ) : (
                    <Flex>
                        <button className={cx('bar-btn-sub')} onClick={() => setIsShowNav(true)}>
                            <FontAwesomeIcon icon={faBars} className="fa-lg" />
                        </button>
                        <Alert
                            message="Please choose your room"
                            type="info"
                            showIcon
                            style={{ margin: 5 }}
                            closable={false}
                            className={cx('alert')}
                        />
                    </Flex>
                )}
                <div className={cx('body')}>
                    <div className={cx('messages')}>
                        {messages.map((mes, index) => {
                            return <Message item={mes} key={index} />;
                        })}
                    </div>
                    {selectedRoomID && (
                        <Form>
                            <div className={cx('send-wrap')}>
                                <Form.Item className={cx('send-input-wrap')}>
                                    <TextareaAutosize
                                        variant={false}
                                        value={chatValue}
                                        autoComplete="off"
                                        className={cx('send-input')}
                                        placeholder="Your message...."
                                        onChange={(e) => handleChange(e)}
                                        onPressEnter={handleSubmit}
                                        style={{
                                            border: 'none',
                                            resize: 'none',
                                            width: '100%',
                                            padding: '0px 10px',
                                            outline: 'none',
                                        }}
                                    />
                                </Form.Item>
                                <button
                                    className={cx('send-submit', { allow: allowSubmit })}
                                    onClick={handleSubmit}
                                >
                                    Send
                                </button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
            <ModalInvite
                isShowInviteModal={isShowInviteModal}
                setIsShowInviteModal={setIsShowInviteModal}
                curMembers={selectedRoom?.members}
                selectedRoomID={selectedRoomID}
            />
        </>
    );
}

export default WindowChat;
