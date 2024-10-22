import classNames from 'classnames/bind';
import styles from './ApproveDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailClass } from '~/requestApi/requestClass';
import { teacher } from '~/redux/reducer/TeacherSlice';

function ApproveDetail() {
    const { slug } = useParams();
    const cartData = useSelector((state) => state.teacher.carts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (slug && Object.keys(cartData).length === 0) {
            getDetailClass(slug)
                .then((res) => {
                    console.log(res);

                    const cart = res.data.class;
                    dispatch(teacher.actions.setCart(cart));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    return <div></div>;
}

export default ApproveDetail;
