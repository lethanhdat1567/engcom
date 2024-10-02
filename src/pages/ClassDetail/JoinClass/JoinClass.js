import classNames from 'classnames/bind';
import styles from './JoinClass.module.scss';
import Button from '~/components/Button';
import { Flex, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import priceTrander from '~/utils/priceTranfer';

const cx = classNames.bind(styles);

function JoinClass({ data }) {
    console.log(data);

    if (data.type) {
        const typeCase = {
            public() {
                return (
                    <Button
                        primary
                        to={`${process.env.REACT_APP_ROOT}/course/${data.id}`}
                        classNames={cx('sub-btn')}
                    >
                        Join class
                    </Button>
                );
            },
            private() {
                return (
                    <div className={cx('private-wrap')}>
                        <div style={{ margin: '10px 0px' }} className={cx('wrap')}>
                            <div className={cx('private-head')}>
                                <span>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <span>Private class</span>
                            </div>
                            <Input.Password placeholder="Enter your password..." />
                        </div>
                        <Button
                            primary
                            to={`${process.env.REACT_APP_ROOT}/course/${data.id}`}
                            classNames={cx('sub-btn')}
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
