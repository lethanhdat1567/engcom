import classNames from 'classnames/bind';
import styles from './TeacherClassOverView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMoneyBill1, faUser } from '@fortawesome/free-solid-svg-icons';
import AnalystItem from '../TeacherClassHome/AnalystItem';
import CartItem from '~/components/CartItem';
import { useSelector } from 'react-redux';
import CourseItem from '~/components/CourseItem/CourseItem';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetailClass } from '~/requestApi/requestClass';
import Skeleton from 'react-loading-skeleton';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';

const cx = classNames.bind(styles);

function TeacherClassOverView() {
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const [classData, setClassData] = useState([]);
    const [loading, setLoading] = useState(false);
    const AnaData = [
        {
            title: 'Users',
            icon: <FontAwesomeIcon icon={faUser} className="fa-lg" />,
            total:
                classData && classData.info && classData.info.length > 0
                    ? classData.info[0].subscribe_count
                    : 0,
        },
        {
            title: 'Comments',
            icon: <FontAwesomeIcon icon={faComment} className="fa-lg" />,
            total:
                classData && classData.info && classData.info.length > 0
                    ? classData.info[0].comment_count
                    : 0,
        },
    ];

    useEffect(() => {
        setLoading(true);
        getDetailClass(slug)
            .then((res) => {
                setLoading(false);
                setClassData(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            {loading ? (
                <div className={cx('loading-wrap')}>
                    <Skeleton height={50} count={8} style={{ margin: '10px 0px' }} />
                </div>
            ) : (
                <>
                    {user.role_id !== 4 && (
                        <div className="row row-cols-1 row-cols-md-2 g-5">
                            {AnaData.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <AnalystItem item={item} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <h1 className={cx('title')}>Class cart</h1>
                    <div className={cx('cart-wrap')}>
                        <CartItem data={classData} />
                    </div>
                    <div className={cx('desc-wrap')}>
                        <h2 className={cx('desc-title')}>Description</h2>
                        <div
                            className={cx('desc')}
                            dangerouslySetInnerHTML={{ __html: classData?.class?.description }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TeacherClassOverView;
