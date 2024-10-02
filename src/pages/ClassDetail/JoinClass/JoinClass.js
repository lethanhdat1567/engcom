import classNames from 'classnames/bind';
import styles from './JoinClass.module.scss';
import Button from '~/components/Button';
import { Flex, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import priceTrander from '~/utils/priceTranfer';
import { useDispatch, useSelector } from 'react-redux';
import { validateFree } from '~/utils/validateSubscribe';
import { checkPrivateClass, deleteSubscribe, insertSubscribe } from '~/requestApi/requestSubscribe';
import { subscribeClass } from '~/redux/reducer/SubscribeSlice';
import { useState } from 'react';

const cx = classNames.bind(styles);

function JoinClass({ data }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const freeClass = useSelector((state) => state.subscribeClass.free);

    const [privateValue, setPrivateValue] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [privateError, setPrivateError] = useState(null);

    // Handle free
    const handleSubFree = () => {
        if (!validateFree(freeClass, user.id)) {
            const values = {
                class_id: data.id,
                user_id: user.id,
            };
            insertSubscribe(values)
                .then((res) => {
                    dispatch(subscribeClass.actions.setFree(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const currentSub = freeClass.find((item) => item.class_id === data.id);
            deleteSubscribe(currentSub.id)
                .then((res) => {
                    dispatch(subscribeClass.actions.deleteFree(res.data.id));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    // Handle private
    const handlePrivateChange = (e) => {
        setPrivateError(null);
        const value = e.target.value;
        if (value) {
            setPrivateValue(value);
            setAllowSubmit(true);
        } else {
            setPrivateValue('');
            setAllowSubmit(false);
        }
    };

    const handleSubmit = () => {
        if (allowSubmit) {
            const values = {
                password: privateValue,
            };
            checkPrivateClass(values, data.id)
                .then((res) => {
                    console.log(res);

                    setPrivateError(null); // Đặt lỗi thành null nếu thành công
                })
                .catch((error) => {
                    setPrivateError(error.message); // Đảm bảo chỉ lấy message từ lỗi
                });
        }
    };

    if (data.type && user.id !== data.user_id) {
        const typeCase = {
            public() {
                return (
                    <Button primary classNames={cx('sub-btn')} onClick={handleSubFree}>
                        {validateFree(freeClass, user.id) ? 'Unsubscribe' : 'Subscribe'} class
                    </Button>
                );
            },
            private() {
                return (
                    <div className={cx('private-wrap')}>
                        <div className={cx('wrap')}>
                            <div className={cx('private-head')}>
                                <span>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <span>Private class</span>
                            </div>
                            <Input.Password
                                onChange={(e) => handlePrivateChange(e)}
                                placeholder="Enter class password..."
                                status={privateError ? 'error' : ''}
                            />
                            <span className={cx('error')}>{privateError}</span>
                        </div>
                        <Button
                            primary
                            classNames={cx('sub-btn', { active: allowSubmit })}
                            onClick={handleSubmit}
                        >
                            Join class
                        </Button>
                    </div>
                );
            },
            cost() {
                return (
                    <div className={cx('public-wrap')}>
                        {data.discount && (
                            <div className={cx('public-head')}>
                                <span className={cx('price')}>{priceTrander(data.price)}</span>
                                <span className={cx('discount')}>{data.discount}%</span>
                            </div>
                        )}
                        <span className={cx('total', { sale: data.discount })}>1000$</span>

                        <Button primary>Buy class</Button>
                    </div>
                );
            },
        };

        return typeCase[data.type]();
    }
}

export default JoinClass;
