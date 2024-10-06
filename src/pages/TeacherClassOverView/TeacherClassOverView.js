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

const cx = classNames.bind(styles);

function TeacherClassOverView() {
    const { slug } = useParams();
    const cartData = useSelector((state) => state.teacher.carts);
    const courses = useSelector((state) => state.teacher.courses);
    const [classData, setClassData] = useState([]);
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
        getDetailClass(slug)
            .then((res) => {
                setClassData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(classData);

    return (
        <div className={cx('wrap')}>
            <div className="row row-cols-1 row-cols-md-2 g-5">
                {AnaData.map((item, index) => {
                    return (
                        <div className="col" key={index}>
                            <AnalystItem item={item} />
                        </div>
                    );
                })}
            </div>
            <h1 className={cx('title')}>Your class cart</h1>
            <div className={cx('cart-wrap')}>
                <CartItem data={classData} />
            </div>
            <div className={cx('desc-wrap')}>
                <h2 className={cx('desc-title')}>Your description</h2>
                <div
                    className={cx('desc')}
                    dangerouslySetInnerHTML={{ __html: classData?.class?.description }}
                ></div>
            </div>
        </div>
    );
}

export default TeacherClassOverView;
