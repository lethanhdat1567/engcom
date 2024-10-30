import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';
import { startCallVideo } from '~/zegoClould/zegoService';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCopy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { zoom } from '~/redux/reducer/ZoomSlice';
import { useNavigate } from 'react-router-dom';
import { arrayRemove, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { message } from 'antd';
import Draggable from 'react-draggable';
import Tippy from '@tippyjs/react';
import NotFound from '~/Layouts/NotFound/NotFound';

const cx = classNames.bind(styles);

function VideoCall() {
    const zegoUIKitRef = useRef(null);
    const user = useSelector((state) => state.user.user);
    const zoomValue = useSelector((state) => state.zoom.zoom);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showRoomId, setShowRoomId] = useState(false);

    const textToCopy = zoomValue.zoom_id;
    const handleCopy = () => {
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                message.success('Copied successfully!');
            })
            .catch(() => {
                message.error('Copy failed!');
            });
    };

    useEffect(() => {
        if (zoomValue && Object.keys(zoomValue).length > 0) {
            const element = document.getElementById('zego-embed');
            const roomID = zoomValue.zoom_id;
            const userName = user.name.replace(/\s+/g, '_');
            zegoUIKitRef.current = startCallVideo(roomID, userName, element);
        }

        return () => {
            if (zoomValue && zoomValue.zoom_id) {
                const roomRef = doc(db, 'zooms', zoomValue.zoom_id);
                updateDoc(roomRef, {
                    members: arrayRemove(user.id),
                })
                    .then(async () => {
                        const roomDoc = await getDoc(roomRef);
                        if (roomDoc.exists()) {
                            const currentMembers = roomDoc.data().members;
                            if (currentMembers.length === 0) {
                                await deleteDoc(roomRef);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error removing user from members: ', error);
                    });
            }

            if (zegoUIKitRef.current) {
                zegoUIKitRef.current.destroy();
                dispatch(zoom.actions.deleteZoom());
            }
        };
    }, [zoomValue, user.id, dispatch]);

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    return (
        <div className={cx('wrap')}>
            {zoomValue && Object.keys(zoomValue).length > 0 ? (
                <>
                    <div className={cx('back-wrap')} onClick={() => navigate('/community/meeting')}>
                        <span className={cx('back-icon')}>
                            <FontAwesomeIcon icon={faChevronLeft} className="fa-sm" />
                        </span>
                        <span className={cx('back-text')}>back</span>
                    </div>
                    <div id="zego-embed" style={{ width: '100%', height: '100%' }} />
                    {showRoomId ? (
                        !isMobile ? ( // Chỉ sử dụng Draggable nếu không phải là di động
                            <Draggable>
                                <div className={cx('zoom_id-wrap', 'expand')}>
                                    <span
                                        className={cx('icon')}
                                        style={{ background: '#ac2727' }}
                                        onClick={() => setShowRoomId(false)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </span>
                                    <span className={cx('zoom_id')}>Your room ID: {zoomValue.zoom_id}</span>
                                    <Tippy content="Copy">
                                        <span className={cx('icon')} onClick={handleCopy}>
                                            <FontAwesomeIcon icon={faCopy} />
                                        </span>
                                    </Tippy>
                                </div>
                            </Draggable>
                        ) : (
                            <div className={cx('zoom_id-wrap', 'expand')}>
                                <span
                                    className={cx('icon')}
                                    style={{ background: '#ac2727' }}
                                    onClick={() => setShowRoomId(false)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                <span className={cx('zoom_id')}>Your room ID: {zoomValue.zoom_id}</span>
                                <Tippy content="Copy">
                                    <span className={cx('icon')} onClick={handleCopy}>
                                        <FontAwesomeIcon icon={faCopy} />
                                    </span>
                                </Tippy>
                            </div>
                        )
                    ) : (
                        <span className={cx('room-id-btn')} onClick={() => setShowRoomId(true)}>
                            Room ID
                        </span>
                    )}
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
}

export default VideoCall;
