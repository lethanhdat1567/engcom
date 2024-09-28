import classNames from 'classnames/bind';
import styles from './HeaderCourse.module.scss';
import Logo from '~/components/Logo/Logo';
import Note from '~/components/Note/Note';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '~/components/Modal/Modal';
import { useState } from 'react';
import { Button, Flex } from 'antd';

const cx = classNames.bind(styles);

function HeaderCourse() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                {location.pathname !== '/create-class' && (
                    <div className={cx('icon-back')} onClick={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="fa-xl" />
                    </div>
                )}
                <Logo white />
            </div>
            <div className={cx('right')}>
                <Note white />
                <ProfileCourse />
            </div>
        </div>
    );
}

export default HeaderCourse;
