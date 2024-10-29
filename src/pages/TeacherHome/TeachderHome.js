import classNames from 'classnames/bind';
import styles from './TeachderHome.module.scss';
import SliderBanner from '../Home/SliderBanner';
import Classes from '../Classes/Classes';
import EmptyCart from './EmptyCart';
import CartItem from '~/components/CartItem';
import imgs from '~/assets/Image';
import { useEffect, useState } from 'react';
import { getClasses } from '~/requestApi/requestClass';
import { useSelector } from 'react-redux';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';
import { useParams } from 'react-router-dom';
import AlertCreateModal from '~/components/AlertCreateModal/AlertCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Modal } from 'antd';
import { showDeletedClass } from '~/requestApi/requestAdmin';
import ClassItemLarge from '~/components/ClassItemLarge/ClassItemLarge';

const cx = classNames.bind(styles);

function TeacherHome() {
    const user = useSelector((state) => state.user.user);
    const [Cartsdata, setCartsData] = useState([]);
    const [deletedClasses, setDeletedClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        getClasses(user.id)
            .then((res) => {
                setCartsData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        showDeletedClass(user.id)
            .then((res) => {
                setDeletedClasses(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className={cx('home')}>
                <div className={cx('banner')}>
                    <SliderBanner />
                </div>
                <div className="container">
                    <div className={cx('content')}>
                        <div className={cx('title-wrap')}>
                            <h1 className={cx('title')}>Your classes</h1>
                            <Tippy placement="top" content="Your denied or deleted classes">
                                <span className={cx('icon-wrap')} onClick={() => setDeleteModal(true)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </span>
                            </Tippy>
                        </div>
                        <div className={cx('classes')}>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
                                <div className="col">
                                    <EmptyCart />
                                </div>
                                {loading &&
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div className="col" key={index}>
                                            <CartLoading />
                                        </div>
                                    ))}
                                {Cartsdata?.map((item, index) => {
                                    return (
                                        <div className="col" key={index}>
                                            <CartItem create data={item} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AlertCreateModal />
            <Modal
                open={deleteModal}
                onCancel={() => setDeleteModal(false)}
                title={
                    <Tippy content="The classes below are those that the admin has denied public access to or that you have deleted.">
                        <span className={cx('icon-wrap')}>
                            <FontAwesomeIcon icon={faQuestion} />
                        </span>
                    </Tippy>
                }
            >
                <div className={cx('class-wrap')}>
                    {deletedClasses.length > 0 ? (
                        deletedClasses.length > 0 &&
                        deletedClasses.map((item, index) => {
                            return <ClassItemLarge data={{ class: item }} key={index} />;
                        })
                    ) : (
                        <span className={cx('empty-class')}>You don't have any deleted classes</span>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default TeacherHome;
