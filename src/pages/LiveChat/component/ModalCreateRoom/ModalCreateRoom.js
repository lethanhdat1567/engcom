import classNames from 'classnames/bind';
import styles from './ModalCreateRoom.module.scss';
import { Form, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { addDocument } from '~/firebase/service';

const cx = classNames.bind(styles);

function ModalCreateRoom({ isCreateRoom, setIsCreateRoom }) {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user.user);

    const handleCancel = () => {
        setIsCreateRoom(false);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                addDocument('rooms', { ...values, members: [`${user.id}`] });
                setIsCreateRoom(false);
                form.resetFields();
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    return (
        <Modal onCancel={handleCancel} onOk={handleOk} open={isCreateRoom} title="Create room">
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Room name"
                    name="fieldName"
                    rules={[{ required: true, message: 'Please input your room name!' }]}
                >
                    <Input placeholder="Your room title..." />
                </Form.Item>
                <Form.Item
                    label="Room description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your room description!' }]}
                >
                    <Input.TextArea placeholder="Your description..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalCreateRoom;
