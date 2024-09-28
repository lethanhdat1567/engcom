import classNames from 'classnames/bind';
import styles from './TeacherNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faComment,
    faEye,
    faHome,
    faTriangleExclamation,
    faUsersLine,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import NavList from './NavList';
import { edit, view } from '~/assets/Icon';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useState } from 'react';
import Modal from '~/components/Modal/Modal';
import { Flex } from 'antd';

const cx = classNames.bind(styles);

function TeacherNavbar({ showNav, setShowNav }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const cartsCreate = useSelector((state) => state.teacher.carts);
    const coursesCreate = useSelector((state) => state.teacher.courses);

    const [showModal, setShowModal] = useState(false);

    const createNav = [
        {
            title: 'Design',
            icon: edit,
            children: [
                {
                    title: 'Your class',
                    icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
                    to: 'create-class',
                },
                {
                    title: 'Courses',
                    icon: <FontAwesomeIcon className="fa-md" icon={faBook} />,
                    to: 'create-class/courses',
                },
            ],
        },
        {
            title: 'View',
            icon: view,
            children: [
                {
                    title: 'OverView',
                    icon: <FontAwesomeIcon className="fa-md" icon={faEye} />,
                    to: 'create-class/overview',
                },
            ],
        },
    ];
    const navItems = [
        {
            title: 'Design',
            icon: edit,
            children: [
                {
                    title: 'Your class',
                    icon: <FontAwesomeIcon className="fa-md" icon={faHome} />,
                    to: 'class/1',
                },
                {
                    title: 'Courses',
                    icon: <FontAwesomeIcon className="fa-md" icon={faBook} />,
                    to: 'class/1/courses',
                },
            ],
        },
        {
            title: 'View',
            icon: view,
            children: [
                {
                    title: 'OverView',
                    icon: <FontAwesomeIcon className="fa-md" icon={faEye} />,
                    to: 'class/1/overview',
                },
                {
                    title: 'Users',
                    icon: <FontAwesomeIcon className="fa-md" icon={faUsersLine} />,
                    to: 'class/1/users',
                },
                {
                    title: 'All comments',
                    icon: <FontAwesomeIcon className="fa-md" icon={faComment} />,
                    to: 'class/1/comments',
                },
            ],
        },
    ];

    const handleClick = () => {
        if (Object.keys(cartsCreate).length > 0 && coursesCreate.length > 0) {
            console.log('export');
        }
    };
    const handleCancle = () => {
        if (Object.keys(cartsCreate).length > 0 || coursesCreate.length > 0) {
            setShowModal(true);
            return;
        }
        navigate('/');
    };
    const handleAdopt = () => {
        navigate('/');
    };
    return (
        <>
            <div className={cx('wrap', { show: showNav })}>
                <div className={cx('head-wrap')}>
                    <h2 className={cx('title')}>Navigation</h2>
                    <span className={cx('x-mark')} onClick={() => setShowNav(false)}>
                        <FontAwesomeIcon icon={faXmark} className="fa-lg" />
                    </span>
                </div>
                <ul className={cx('list')}>
                    {slug
                        ? navItems.map((item, index) => {
                              return <NavList item={item} key={index} />;
                          })
                        : createNav.map((item, index) => {
                              return <NavList item={item} key={index} />;
                          })}
                </ul>
                <Button
                    classNames={cx('export-btn')}
                    onClick={handleClick}
                    disable={Object.keys(cartsCreate).length > 0 && coursesCreate.length > 0 ? false : true}
                >
                    Export class
                </Button>
                <Button classNames={cx('delete-btn')} onClick={handleCancle}>
                    Cancle class
                </Button>
            </div>
            <Modal toggle={showModal} setToggle={setShowModal}>
                <div className={cx('modal')}>
                    <div className={cx('drop-head')}>
                        <span className={cx('modal-icon')}>
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                        </span>
                        <span className={cx('modal-title')}>Warning</span>
                    </div>
                    <div className={cx('drop-mbody')}>
                        <p className={cx('drop-desc')}>Tat ca du lieu cua ban se mat sau khi thoat ra !.</p>
                    </div>
                    <Flex gap={10} justify="right">
                        <Button classNames={cx('btn-cancle')} onClick={() => setShowModal(false)}>
                            Cancle
                        </Button>
                        <Button save onClick={handleAdopt}>
                            I got it
                        </Button>
                    </Flex>
                </div>
            </Modal>
        </>
    );
}

export default TeacherNavbar;
