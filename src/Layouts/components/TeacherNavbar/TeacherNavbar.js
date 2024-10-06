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
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useState } from 'react';
import Modal from '~/components/Modal/Modal';
import { Flex } from 'antd';
import { requestDeleteUpload, requestDeleteVideo } from '~/requestApi/requestUpload';
import { teacher } from '~/redux/reducer/TeacherSlice';
import Loading from '~/components/Loading/Loading';
import { createClass, deleteClass, updateClass } from '~/requestApi/requestClass';
import { activeLesson } from '~/redux/reducer/ActiveLesson';
import { faLess } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function TeacherNavbar({ showNav, setShowNav }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // redux data
    const cartsCreate = useSelector((state) => state.teacher.carts);
    const coursesCreate = useSelector((state) => state.teacher.courses);
    const lessonsCreate = useSelector((state) => state.teacher.lessons);
    const contentsCreate = useSelector((state) => state.teacher.content);

    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

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
                    to: `own/${slug}`,
                },
                {
                    title: 'Courses',
                    icon: <FontAwesomeIcon className="fa-md" icon={faBook} />,
                    to: `own/${slug}/courses`,
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
                    to: `own/${slug}/overview`,
                },
                {
                    title: 'Users',
                    icon: <FontAwesomeIcon className="fa-md" icon={faUsersLine} />,
                    to: `own/${slug}/users`,
                },
                {
                    title: 'All comments',
                    icon: <FontAwesomeIcon className="fa-md" icon={faComment} />,
                    to: `own/${slug}/comments`,
                },
            ],
        },
    ];
    const contents = useSelector((state) => state.teacher.content);
    const handleClick = () => {
        // Create
        if (Object.keys(cartsCreate).length > 0 && coursesCreate.length > 0 && !slug) {
            setLoading(true);
            const values = {
                carts: cartsCreate,
                courses: coursesCreate,
                lessons: lessonsCreate,
                contents: contentsCreate,
            };
            createClass(values)
                .then((res) => {
                    setLoading(false);
                    dispatch(teacher.actions.resetState());
                    dispatch(activeLesson.actions.deleteActiveLesson());
                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
            // Update
        } else if (Object.keys(cartsCreate).length > 0 && coursesCreate.length > 0 && slug) {
            setLoading(true);
            const values = {
                carts: cartsCreate,
                courses: coursesCreate,
                lessons: lessonsCreate,
                contents: contentsCreate,
            };

            updateClass(values, slug)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    };
    const handleDeleteCart = () => {
        setShowModal(true);
        setIsDelete(true);
    };
    const handleCancle = () => {
        if (Object.keys(cartsCreate).length > 0 || coursesCreate.length > 0) {
            setShowModal(true);
            return;
        }
        navigate('/');
    };

    const handleAdopt = () => {
        if (!slug) {
            if (cartsCreate.thumbnail) {
                requestDeleteUpload(cartsCreate.banner);
            }
            contents.map((item, index) => {
                if (item.video) {
                    setLoading(true);
                    requestDeleteVideo({ url: item.video })
                        .then((res) => {
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.log(error);
                            setLoading(false);
                        });
                }
            });
            dispatch(teacher.actions.resetState());
            dispatch(activeLesson.actions.deleteActiveLesson());
            navigate('/');
        } else if (slug && isDelete) {
            setLoading(true);
            deleteClass(slug)
                .then((res) => {
                    setLoading(false);
                    setIsDelete(false);
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                });
            dispatch(activeLesson.actions.deleteActiveLesson());
            dispatch(teacher.actions.resetState());
            navigate('/');
        } else {
            dispatch(activeLesson.actions.deleteActiveLesson());
            dispatch(teacher.actions.resetState());
            navigate('/');
        }
    };
    return (
        <>
            {loading && <Loading />}
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
                    disable={Object.keys(cartsCreate)?.length > 0 && coursesCreate?.length > 0 ? false : true}
                >
                    {slug ? 'Update class' : 'Export class'}
                </Button>
                {slug && (
                    <Button classNames={cx('delete-btn')} onClick={handleDeleteCart}>
                        Delete Cart
                    </Button>
                )}
                <Button classNames={cx('cancle-btn')} onClick={handleCancle}>
                    {slug ? 'Cancle update' : 'Cancle class'}
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
                        <p className={cx('drop-desc')}>Tat ca du lieu cua ban se mat het !.</p>
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
