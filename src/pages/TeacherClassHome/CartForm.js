import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import { Button, Col, Flex, Form, Input, message, Row, Select, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function CartForm({ states }) {
    const { cartPrice, cartDiscount, setTitleCart, setCartPrice, setCartDiscount, setCartTotal } = states;
    const [cartType, setCartType] = useState('free');
    const props = {
        name: 'file',
        action: '',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        const discountAmount = cartPrice * (cartDiscount / 100);
        const totalFl = cartPrice - discountAmount;
        const total = Math.round(totalFl);
        setCartTotal(total);
    }, [cartPrice, cartDiscount]);
    return (
        <div className={cx('form')}>
            <Form layout="vertical">
                <Form.Item label="Cart title">
                    <Input
                        placeholder="Write your cart title..."
                        onChange={(e) => setTitleCart(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Type">
                    <Select defaultValue="free" onChange={(value) => setCartType(value)}>
                        <Select.Option value="free">Public lesson</Select.Option>
                        <Select.Option value="fee">Private lesson</Select.Option>
                    </Select>
                    {cartType === 'fee' && (
                        <Form.Item label="Set your price">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Input
                                        placeholder="your price..."
                                        onChange={(e) => setCartPrice(e.target.value)}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder="your discount..."
                                        onChange={(e) => setCartDiscount(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    )}
                </Form.Item>
                <Form.Item>
                    <Upload {...props}>
                        <Button>
                            <FontAwesomeIcon icon={faUpload} />
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CartForm;
