import classNames from 'classnames/bind';
import styles from './JoinClass.module.scss';
import Button from '~/components/Button';
import { Flex, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import priceTrander from '~/utils/priceTranfer';
import { useDispatch, useSelector } from 'react-redux';
import { validateFree } from '~/utils/validateSubscribe';
import { checkPrivateClass, deleteSubscribe, insertSubscribe } from '~/requestApi/requestSubscribe';
import { subscribeClass } from '~/redux/reducer/SubscribeSlice';
import { useState } from 'react';
import Validate from '~/pages/Validate';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function JoinClass({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const freeClass = useSelector((state) => state.subscribeClass.free);

    const [privateValue, setPrivateValue] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [privateError, setPrivateError] = useState(null);
    const [regisModal, setRegisModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle free
    const handleSubFree = () => {
        if (Object.keys(user).length === 0) {
            setRegisModal(true);
        } else {
            if (!validateFree(freeClass, user.id, slug)) {
                const values = {
                    class_id: data.id,
                    user_id: user.id,
                };
                setLoading(true);
                insertSubscribe(values)
                    .then((res) => {
                        setLoading(false);
                        dispatch(subscribeClass.actions.setFree(res.data));
                        navigate(`/course/${data.id}`);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
            } else {
                navigate(`/course/${data.id}`);
            }
        }
    };
    const handleUnsub = () => {
        const currentSub = freeClass.find((item) => item.class_id === data.id);
        setLoading(true);
        deleteSubscribe(currentSub.id)
            .then((res) => {
                setLoading(false);
                dispatch(subscribeClass.actions.deleteFree(res.data.id));
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };
    const handleSubmit = () => {
        if (Object.keys(user).length === 0) {
            setRegisModal(true);
        } else {
            if (allowSubmit) {
                const values = {
                    password: privateValue,
                };
                setLoading(true);
                checkPrivateClass(values, data.id)
                    .then((res) => {
                        const data = res.data;
                        const values = {
                            class_id: data.id,
                            user_id: user.id,
                        };

                        insertSubscribe(values)
                            .then((res) => {
                                setLoading(false);
                                dispatch(subscribeClass.actions.setFree(res.data));
                                navigate(`/course/${data.id}`);
                            })
                            .catch((error) => {
                                setLoading(false);
                                console.log(error);
                            });
                        setPrivateError(null);
                    })
                    .catch((error) => {
                        setPrivateError(error.message);
                    });
            }
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
    const handleJoinPrivate = () => {
        console.log('test');

        navigate(`/course/${data.id}`);
    };
    // Handle cost
    const handleCostBuy = () => {};

    if (data.type && user.id !== data.user_id) {
        const typeCase = {
            public() {
                return (
                    <>
                        {validateFree(freeClass, user.id, slug) ? (
                            <div className={cx('public-btn-wrap')}>
                                <Button primary classNames={cx('public-btn-join')} onClick={handleSubFree}>
                                    Join class
                                </Button>
                                <button className={cx('unsub')} onClick={handleUnsub}>
                                    {loading ? (
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            className="fa-solid fa-spinner fa-spin-pulse"
                                        />
                                    ) : (
                                        'Unsubscribe class'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <Button primary classNames={cx('public-btn')} onClick={handleSubFree}>
                                {loading ? (
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="fa-solid fa-spinner fa-spin-pulse"
                                    />
                                ) : (
                                    'Subscribe class'
                                )}
                            </Button>
                        )}
                        {regisModal && (
                            <Validate toggle={regisModal} setToggle={setRegisModal} field="Register" />
                        )}
                    </>
                );
            },
            private() {
                return (
                    <>
                        <div className={cx('private-wrap')}>
                            {!validateFree(freeClass, user.id, slug) ? (
                                <>
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
                                </>
                            ) : (
                                <div className={cx('public-btn-wrap')}>
                                    <Button
                                        primary
                                        classNames={cx('private-join-btn')}
                                        onClick={handleJoinPrivate}
                                    >
                                        Join class
                                    </Button>
                                    <button className={cx('unsub')} onClick={handleUnsub}>
                                        Unsubscribe class
                                    </button>
                                </div>
                            )}
                        </div>
                        {regisModal && (
                            <Validate toggle={regisModal} setToggle={setRegisModal} field="Register" />
                        )}
                    </>
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
                        <span className={cx('total', { sale: data.discount })}>
                            {priceTrander(data.total)}
                        </span>

                        {validateFree(freeClass, user.id, slug) ? (
                            <Button primary classNames={cx('public-btn-join')} onClick={handleSubFree}>
                                Join class
                            </Button>
                        ) : (
                            <Button primary onClick={handleCostBuy}>
                                Buy class
                            </Button>
                        )}
                    </div>
                );
            },
        };

        return typeCase[data.type]();
    }
}

export default JoinClass;
