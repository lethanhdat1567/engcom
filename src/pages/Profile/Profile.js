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
import UserRole from '~/components/UserRole/UserRole';
import ProfileLoading from '~/components/Loading/ProfileLoading/ProfileLoading';

const cx = classNames.bind(styles);

function Profile() {
    const { slug } = useParams();
    const user = useSelector((state) => state.user.user);
    const [userData, setUserData] = useState();
    const [classesData, setClassesData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (slug) {
            setLoading(true);
            getUser(slug)
                .then((res) => {
                    setUserData(res.data);
                    getMyClass(slug)
                        .then((res) => {
                            setLoading(false);
                            setClassesData(res);
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setLoading(true);
            getMyClass(user.id)
                .then((res) => {
                    setLoading(false);
                    setClassesData(res);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    }, []);

    if (user) {
        return (
            <div className={cx('wrap')}>
                {loading ? (
                    <ProfileLoading />
                ) : (
                    <>
                        {slug ? (
                            <div className={cx('banner')}>
                                <div className={cx('user-banner')}>
                                    <img
                                        className={cx('avatar')}
                                        src={
                                            userData?.avatar?.includes('googleusercontent.com') ||
                                            userData?.avatar?.includes('facebook.com')
                                                ? userData?.avatar
                                                : userData?.avatar
                                                ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${userData?.avatar}`
                                                : imgs.unsetAvatar
                                        }
                                        alt="User Avatar"
                                    />
                                    <div className={cx('name')}>
                                        {userData?.name}
                                        <UserRole type={userData?.role_id} />
                                    </div>
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
                                    <div className={cx('name')}>
                                        <span>{user.name}</span>
                                        <span>
                                            <UserRole type={user?.role_id} />
                                        </span>
                                    </div>
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
                                        <h2 className={cx('info-title')}>Join classes</h2>
                                        {classesData.map((item, index) => {
                                            return <ClassItemLarge data={item} key={index} />;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Profile;
