import classNames from 'classnames/bind';
import styles from './FormZoom.module.scss';
import imgs from '~/assets/Image';
import { Button, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useFirestore from '~/hooks/useFirestore';
import { useDispatch, useSelector } from 'react-redux';
import { zoom } from '~/redux/reducer/ZoomSlice';
import { error } from 'jodit/esm/core/helpers';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase/config';

const cx = classNames.bind(styles);

function FormZoom() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [form] = useForm();
    const [formValue, setFormValue] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setFormValue(values);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    const roomsCondition = useMemo(
        () => ({
            fieldName: 'zoom_id',
            operator: '==',
            compareValue: formValue?.meeting_id,
        }),
        [formValue],
    );

    const roomsData = useFirestore('zooms', roomsCondition);

    useEffect(() => {
        if (formValue) {
            const room = roomsData[0];
            if (room) {
                if (room.meeting_password === formValue?.meeting_password) {
                    if (!room.members.includes(user.id)) {
                        const roomRef = doc(db, 'zooms', room.zoom_id);
                        updateDoc(roomRef, {
                            members: [...room.members, user.id],
                        })
                            .then((res) => {
                                dispatch(
                                    zoom.actions.updateZoom({
                                        members: [...room.members, user.id],
                                        createdAt: room.createdAt.toString(),
                                    }),
                                );
                                navigate(`/community/meeting/${room.zoom_id}`);
                                setErrorMessage('');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        dispatch(
                            zoom.actions.getZoom({
                                ...room,
                                createdAt: room.createdAt.toString(),
                            }),
                        );
                        navigate(`/community/meeting/${room.zoom_id}`);
                    }
                } else {
                    console.error('Invalid password');
                    setErrorMessage('Invalid password!');
                }
            } else {
                setErrorMessage('Room not found!');
            }
        }
    }, [roomsData, formValue, user.id, dispatch]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-md-2" style={{ height: '100%' }}>
                    <div className="col">
                        <img src={imgs.validate_zoom} className={cx('img')} />
                    </div>
                    <div className="col">
                        <div className={cx('form')}>
                            <div className={cx('form-wrap')}>
                                <h2 className={cx('title')}>Join meeting</h2>
                                <Form form={form} layout="vertical">
                                    <Form.Item
                                        label="Meeting ID"
                                        name="meeting_id"
                                        rules={[
                                            { required: true, message: 'Please input the meeting password!' },
                                        ]}
                                    >
                                        <Input placeholder="Meeting password" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Meeting password"
                                        name="meeting_password"
                                        rules={[
                                            { required: true, message: 'Please input the meeting password!' },
                                        ]}
                                    >
                                        <Input.Password placeholder="Meeting password" />
                                    </Form.Item>
                                    {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
                                </Form>
                                <p className={cx('desc')}>
                                    Please ensure you have entered all the required information, including the
                                    meeting password, before attempting to join the meeting. Thank you!
                                </p>
                            </div>
                            <Flex gap={10} justify="end" style={{ marginTop: 'auto' }}>
                                <Button type="primary" danger onClick={() => navigate('/community/meeting')}>
                                    Cancle
                                </Button>
                                <Button type="primary" onClick={handleSubmit}>
                                    Join class
                                </Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormZoom;
