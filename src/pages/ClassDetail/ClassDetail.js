import classNames from 'classnames/bind';
import styles from './ClassDetail.module.scss';
import imgs from '~/assets/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment/Comment';
import { useEffect, useState } from 'react';
import { getDetailClass } from '~/requestApi/requestClass';
import { useParams } from 'react-router-dom';
import ClassDetailLoading from '~/components/Loading/ClassDetailLoading/ClassDetailLoading';
import Img from '~/components/Img';
import JoinClass from './JoinClass/JoinClass';

const cx = classNames.bind(styles);

function ClassDetail() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [classData, setClassData] = useState({});
    useEffect(() => {
        setLoading(true);
        getDetailClass(slug)
            .then((res) => {
                setClassData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    const validateType = () => {
        switch (classData.type) {
            case 'cost':
                return 'Cost';
            case 'private':
                return 'Private';
            case 'public':
                return 'Public';
            default:
                return 'Error';
        }
    };

    return (
        <div className={cx('wrap')}>
            {loading ? (
                <ClassDetailLoading />
            ) : (
                <div className={cx('row', 'd-lg-flex', 'flex-column-reverse', 'flex-lg-row')}>
                    <div className={cx('col col-12 col-lg-8')}>
                        <div
                            className={cx('design')}
                            dangerouslySetInnerHTML={{ __html: classData.description }}
                        ></div>
                        <Comment />
                    </div>
                    <div className={cx('col col-12 col-lg-4')}>
                        <div className={cx('info')}>
                            <Img
                                src={
                                    classData.thumbnail
                                        ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${classData.thumbnail}`
                                        : imgs.NoImg
                                }
                                className={cx('banner')}
                            />
                            <span className={cx('costs')}>{validateType()} Class</span>
                            <JoinClass data={classData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClassDetail;
