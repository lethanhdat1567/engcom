import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import imgs from '~/assets/Image';
import InfoUser from './InfoUser';
import ClassItemLarge from '~/components/ClassItemLarge/ClassItemLarge';
import { useSelector } from 'react-redux';
import Img from '~/components/Img';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMyClass } from '~/requestApi/requestMyClass';
import { getUser } from '~/requestApi/requestUser';

const cx = classNames.bind(styles);

function Profile() {
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const [userData, setUserData] = useState();
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        if (slug) {
            getUser(slug)
                .then((res) => {
                    setUserData(res.data);
                    getMyClass(slug)
                        .then((res) => {
                            setClassesData(res);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            getMyClass(user.id)
                .then((res) => {
                    setClassesData(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (user) {
        return (
            <div className={cx('wrap')}>
                {slug && userData?.avatar ? (
                    <div className={cx('banner')}>
                        <div className={cx('user-banner')}>
                            <Img
                                className={cx('avatar')}
                                src={
                                    userData?.avatar?.includes('googleusercontent.com') ||
                                    userData?.avatar?.includes('facebook.com')
                                        ? userData?.avatar
                                        : `${process.env.REACT_APP_BACKEND_UPLOAD}/${userData?.avatar}`
                                }
                                alt="User Avatar"
                            />
                            <div className={cx('name')}>{userData?.name}</div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('banner')}>
                        <div className={cx('user-banner')}>
                            <Img
                                className={cx('avatar')}
                                src={
                                    user.avatar?.includes('googleusercontent.com') ||
                                    user.avatar?.includes('facebook.com')
                                        ? user.avatar
                                        : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                                }
                                alt="User Avatar"
                            />
                            <div className={cx('name')}>{user.name}</div>
                        </div>
                    </div>
                )}
                <div className={cx('content')}>
                    <div className="row">
                        <div className="col col-12 col-lg-4">
                            <InfoUser info={userData} />
                        </div>
                        <div className="col col-12 col-lg-8">
                            <div className={cx('wrapper')}>
                                <h2 className={cx('info-title')}>Your classes</h2>
                                {classesData.map((item, index) => {
                                    return <ClassItemLarge data={item} key={index} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
