import classNames from 'classnames/bind';
import styles from './ModalInvite.module.scss';
import { Avatar, Flex, Form, Modal, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { requestSearch } from '~/requestApi/requestSearch';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase/config';

const cx = classNames.bind(styles);

function ModalInvite({ isShowInviteModal, setIsShowInviteModal, curMembers, selectedRoomID }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [form] = Form.useForm();

    const debounceFetcher = debounce((searchValue) => {
        if (searchValue) {
            setSearchValue(searchValue);
            setFetching(true);
            requestSearch(searchValue, 'more')
                .then((res) => {
                    setOptions(
                        res[0].children.filter((item) => {
                            return !curMembers.includes(`${item.user_id}`);
                        }),
                    );
                    setFetching(false);
                })
                .catch((error) => {
                    console.log(error);
                    setFetching(false);
                });
        } else {
            setSearchValue('');
            setOptions([]);
        }
    }, 700);

    const handleSearch = (value) => {
        debounceFetcher(value);
    };

    const handleOk = async () => {
        setSearchValue('');
        try {
            form.resetFields();
            setValue([]);
            const roomRef = doc(db, 'rooms', selectedRoomID);
            await updateDoc(roomRef, {
                members: [...curMembers, ...value],
            });
        } catch (error) {
            console.error('Error updating members: ', error);
        } finally {
            setIsShowInviteModal(false);
        }
    };

    const handleCancel = () => {
        setValue([]);
        setOptions([]);
        setSearchValue('');
        setIsShowInviteModal(false);
    };

    return (
        <Modal
            title="Invite more people to your class"
            open={isShowInviteModal}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            destroyOnClose={true}
        >
            <Form layout="vertical" form={form}>
                <Select
                    mode="multiple"
                    placeholder="Nhập tên thành viên"
                    style={{ width: '100%' }}
                    value={value}
                    onSearch={handleSearch}
                    filterOption={false}
                    notFoundContent={
                        fetching ? <Spin size="small" /> : searchValue && <div>User not found</div>
                    }
                    onChange={setValue}
                    onBlur={() => {
                        setSearchValue('');
                        setOptions([]);
                    }}
                >
                    {options.map((item) => (
                        <Select.Option key={item.user_id} value={`${item.user_id}`}>
                            <Flex align="center" gap={6}>
                                <Avatar
                                    size="small"
                                    src={
                                        item?.img?.includes('googleusercontent.com') ||
                                        item?.img?.includes('facebook.com')
                                            ? item?.img
                                            : `${process.env.REACT_APP_BACKEND_UPLOAD}/${item.img}`
                                    }
                                >
                                    {item.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <span>{item.name}</span>
                            </Flex>
                        </Select.Option>
                    ))}
                </Select>
            </Form>
        </Modal>
    );
}

export default ModalInvite;
