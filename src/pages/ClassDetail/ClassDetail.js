import classNames from 'classnames/bind';
import styles from './ClassDetail.module.scss';
import imgs from '~/assets/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment/Comment';
import { useEffect, useState } from 'react';
import { getDetailClass } from '~/requestApi/requestClass';
import { useParams } from 'react-router-dom';
import ClassDetailLoading from '~/components/Loading/ClassDetailLoading/ClassDetailLoading';
import Img from '~/components/Img';
import JoinClass from './JoinClass/JoinClass';
import { handleAvatar } from '~/utils/handleAvatar';
import InfoCart from '~/components/CartItem/InfoCart';

const cx = classNames.bind(styles);

function ClassDetail() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [classData, setClassData] = useState({});
    const [userData, setUserData] = useState({});
    useEffect(() => {
        setLoading(true);
        getDetailClass(slug)
            .then((res) => {
                setClassData(res.data.class);
                setUserData(res.data.info);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    const validateType = () => {
        switch (classData.type) {
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
                            <div className={cx('info-bottom')}>
                                <div className={cx('user')}>
                                    <img
                                        src={handleAvatar(userData[0]?.user?.avatar)}
                                        className={cx('avatar')}
                                    />
                                    <span className={cx('name')}>{userData[0]?.user?.name}</span>
                                </div>
                                <ul className={cx('list')}>
                                    <li className={cx('item-sub')}>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon className="fa-lg" icon={faUser} />
                                        </span>
                                        <span className={cx('item-info')}>
                                            {userData[0]?.subscribe_count}
                                        </span>
                                    </li>
                                    <li className={cx('item-sub')}>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon className="fa-lg" icon={faComment} />
                                        </span>
                                        <span className={cx('item-info')}>{userData[0]?.comment_count}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClassDetail;
