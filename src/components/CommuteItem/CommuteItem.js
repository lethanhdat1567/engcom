import classNames from 'classnames/bind';
import styles from './CommuteItem.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Validate from '~/pages/Validate';

const cx = classNames.bind(styles);

function CommuItem({ data }) {
    const user = useSelector((state) => state.user.user);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleNavigate = () => {
        if (Object.keys(user).length == 0 || user.role_id == 1) {
            setShowRegisterModal(true);
        }
    };

    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <h2 className={cx('title')}>{data.title}</h2>
                        <p className={cx('desc')}>{data.desc}</p>
                    </div>
                    <Link
                        className={cx('img-wrap')}
                        to={
                            Object.keys(user).length == 0 || user.role_id == 1
                                ? ''
                                : `${process.env.REACT_APP_ROOT}/community${data.to}`
                        }
                        onClick={handleNavigate}
                    >
                        <img className={cx('img')} src={data.img} />
                    </Link>
                </div>
                <Button
                    to={
                        Object.keys(user).length == 0 || user.role_id == 1
                            ? ''
                            : `${process.env.REACT_APP_ROOT}/community${data.to}`
                    }
                    primary
                    classNames={cx('btn')}
                    onClick={handleNavigate}
                >
                    Explore
                </Button>
            </div>
            {showRegisterModal && (
                <Validate toggle={showRegisterModal} setToggle={setShowRegisterModal} field="Register" />
            )}
        </>
    );
}

export default CommuItem;
