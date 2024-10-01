import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import { Button, Col, Flex, Form, Input, message, Row, Select, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { requestDeleteUpload, requestUploadCart } from '~/requestApi/requestUpload';

const cx = classNames.bind(styles);

function CartForm({ states, setCartBanner, cartBanner }) {
    const {
        cartPrice,
        titleCart,
        cartDiscount,
        setTitleCart,
        setCartPrice,
        setCartDiscount,
        setCartTotal,
        cartPassword,
        setCartPassword,
        cartType,
        setCartType,
    } = states;
    const props = {
        name: 'file',
        action: `${process.env.REACT_APP_BACKEND_API}engcom/upload-cart`,
        onChange(info) {
            if (info.file.status === 'uploading') {
                console.log('Uploading:', info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setCartBanner(info.file.response.url);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            requestDeleteUpload(cartBanner)
                .then((res) => {
                    setCartBanner('');
                })
                .catch((error) => console.log(error));
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
                        value={titleCart}
                        onChange={(e) => setTitleCart(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Type">
                    <Select
                        placeholder="-----Select your type-----"
                        value={cartType !== null ? cartType : undefined} // Nếu cartType là null, không đặt giá trị
                        onChange={(value) => {
                            setCartType(value);
                        }}
                    >
                        <Select.Option value="public">Public class</Select.Option>
                        <Select.Option value="cost">Cost class</Select.Option>
                        <Select.Option value="private">Private class</Select.Option>
                    </Select>
                    {cartType === 'cost' && (
                        <Form.Item label="Set your price">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Input
                                        type="number"
                                        value={cartPrice}
                                        placeholder="your price..."
                                        onChange={(e) => {
                                            const value = Math.max(0, e.target.value);
                                            setCartPrice(value);
                                        }}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        value={cartDiscount}
                                        type="number"
                                        placeholder="your discount..."
                                        onChange={(e) => {
                                            const value = Math.max(0, e.target.value);
                                            setCartDiscount(value);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    )}
                    {cartType === 'private' && (
                        <Form.Item label="Set your password">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Input.Password
                                        placeholder="your password..."
                                        value={cartPassword}
                                        onChange={(e) => setCartPassword(e.target.value)}
                                        autoComplete="current-password"
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
