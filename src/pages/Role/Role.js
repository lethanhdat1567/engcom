import classNames from 'classnames/bind';
import styles from './Role.module.scss';
import RoleItem from './components/RoleItem/RoleItem';
import { Button } from 'antd';
import imgs from '~/assets/Image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '~/utils/request';
import { usersSlice } from '~/redux/reducer/UserSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function Role() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentChoiceIndex, setCurrentChoiceIndex] = useState();
    const [loading, setLoading] = useState(false);
    const roleData = [
        {
            banner: imgs.TeacherRole,
            title: 'Teacher',
            value: 3,
            features: [
                'Create and manage course content',
                'Grade assignments and provide feedback',
                'Monitor student progress and attendance',
                'Facilitate discussions and group activities',
                'Communicate with students and parents',
            ],
        },
        {
            banner: imgs.StudentRole,
            title: 'Student',
            value: 2,
            features: [
                'Access course materials and resources',
                'Participate in discussions and group work',
                'Submit assignments and track grades',
                'Communicate with instructors and peers',
                'Monitor personal progress and set learning goals',
            ],
        },
    ];

    const handleSubmit = () => {
        const roleValue = roleData[currentChoiceIndex].value;
        const values = {
            id: user.id,
            role_id: roleValue,
        };
        setLoading(true);
        request
            .post('/engcom/changeRole', values)
            .then((res) => {
                setLoading(false);
                dispatch(usersSlice.actions.updateRole(res.data.role_id));
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div className={cx('wrap')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('body')}>
                        <div className="row row-cols-1 row-cols-lg-2 g-5">
                            {roleData.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <RoleItem
                                            data={item}
                                            index={index}
                                            currentChoiceIndex={currentChoiceIndex}
                                            setCurrentChoiceIndex={setCurrentChoiceIndex}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <Button
                            type="primary"
                            style={{ marginTop: '20px', padding: '20px 24px', fontSize: '2rem' }}
                            onClick={handleSubmit}
                        >
                            Continue
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Role;
