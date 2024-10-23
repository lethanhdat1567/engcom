import classNames from 'classnames/bind';
import styles from './CreateAlert.module.scss';
import { Form, Input, Button, Flex } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CreateAlert() {
    const [activeCreate, setActiveCreate] = useState(false);
    const [form] = Form.useForm();
    const [fileValue, setFileValue] = useState(null);
    const [imgValue, setImgValue] = useState(null);

    const handleCancle = () => {
        form.resetFields();
        setFileValue();
        setImgValue();
        setActiveCreate();
    };

    const handleSubmit = () => {
        let values = form.getFieldsValue();
        values = { ...values, thumbnail: imgValue };
        console.log(values);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setFileValue(imgUrl);
            setImgValue(file);
        }
    };

    return (
        <>
            {activeCreate ? (
                <Flex justify="end" gap={10} style={{ margin: '10px 0px' }}>
                    <Button onClick={handleCancle}>Cancel</Button>
                    <Button type="primary" htmlType="submit" form="create-alert-form">
                        Submit
                    </Button>
                </Flex>
            ) : (
                <div className={cx('create-wrap')} onClick={() => setActiveCreate(true)}>
                    <span className={cx('create-icon')}>
                        <FontAwesomeIcon icon={faPlusSquare} className="fa-lg" />
                    </span>
                    <span className={cx('create-title')}>Create new alert</span>
                </div>
            )}
            <div className={cx('wrap', { active: activeCreate })}>
                <Form form={form} onFinish={handleSubmit} id="create-alert-form">
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the alert title!' }]}
                    >
                        <Input placeholder="Alert title..." />
                    </Form.Item>
                    <div className={cx('up-wrap')}>
                        {fileValue ? (
                            <div className={cx('img-up-wrap')}>
                                <img src={fileValue} className={cx('img')} alt="Uploaded" />
                                <span
                                    className={cx('img-icon')}
                                    onClick={() => {
                                        setFileValue(null);
                                        setImgValue(null);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </div>
                        ) : (
                            <label htmlFor="upload" className={cx('img-wrap')}>
                                <div className={cx('create-img')}>
                                    <span className={cx('create-img-icon')}>
                                        <FontAwesomeIcon icon={faPlusSquare} className="fa-lg" />
                                    </span>
                                    <span className={cx('create-img-title')}>Upload your image</span>
                                </div>
                                <input
                                    type="file"
                                    id="upload"
                                    hidden
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                            </label>
                        )}
                    </div>
                    <Form.Item
                        name="desc"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <TextArea autoSize={{ minRows: 6 }} placeholder="Description..." />
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default CreateAlert;
