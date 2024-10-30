import classNames from 'classnames/bind';
import styles from './CreateMeeting.module.scss';
import imgs from '~/assets/Image';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { addDocument, updateDocument } from '~/firebase/service';
import { useDispatch, useSelector } from 'react-redux';
import { zoom } from '~/redux/reducer/ZoomSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CreateMeeting() {
    const user = useSelector((state) => state.user.user);
    const [showModal, setShowModal] = useState(false);
    const [form] = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancle = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const insertValues = {
                ...values,
                members: [user.id],
                zoom_id: '',
                createdAt: new Date().toISOString(), // Thêm createdAt
            };

            const firestoreValue = await addDocument('zooms', insertValues);

            await updateDocument('zooms', firestoreValue.id, {
                zoom_id: firestoreValue.id,
            });

            const reduxZoomValue = {
                ...insertValues,
                zoom_id: firestoreValue.id,
            };

            // Dispatch giá trị mới vào Redux
            dispatch(zoom.actions.getZoom(reduxZoomValue));

            setShowModal(false);
            form.resetFields();
            navigate(`/community/meeting/${firestoreValue.id}`);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    return (
        <>
            <div className={cx('wrap')} onClick={() => setShowModal(true)}>
                <img src={imgs.create_meeting} className={cx('img')} />
                <h2 className={cx('title')}>Create Meeting</h2>
                <p className={cx('desc')}>Create a new meeting and invite people</p>
            </div>
            <Modal
                onCancel={handleCancle}
                onOk={handleSubmit}
                open={showModal}
                okText="Create Meeting"
                title="Create a meeting"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Meeting name"
                        name="meeting_name"
                        rules={[{ required: true, message: 'Please input the meeting name!' }]}
                    >
                        <Input placeholder="Meeting name" />
                    </Form.Item>
                    <Form.Item
                        label="Meeting password"
                        name="meeting_password"
                        rules={[{ required: true, message: 'Please input the meeting password!' }]}
                    >
                        <Input.Password placeholder="Meeting password" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreateMeeting;
