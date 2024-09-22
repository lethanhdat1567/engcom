import classNames from 'classnames/bind';
import styles from './Role.module.scss';
import imgs from '~/assets/Image';
import { Button, Select } from 'antd';
import { useState } from 'react';
import request from '~/utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersSlice } from '~/redux/reducer/UserSlice';

const cx = classNames.bind(styles);

function Role() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [role, setRole] = useState('0');
    const roleData = [
        {
            img: imgs.StudentRole,
            desc: 'As a student, you can access course materials, participate in discussions, and track your progress.',
        },
        {
            img: imgs.TeacherRole,
            desc: 'As a teacher, you can create courses, manage students, and monitor their performance.',
        },
    ];
    const handleSubmit = () => {
        const roleValue = Number.parseInt(role) + 2;
        const values = {
            id: user.id,
            role_id: roleValue,
        };
        request
            .post('/engcom/changeRole', values)
            .then((res) => {
                dispatch(usersSlice.actions.updateRole(res.data.role_id));
                navigate('/');
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal')}>
                <div className="row row-cols-1">
                    <div className="col">
                        <div className={cx('header')}>
                            <img src={roleData[role]?.img} className={cx('img')} />
                            <h1 className={cx('title')}>WELCOME TO OUR WEBSITE</h1>
                            <p className={cx('head-desc')}>Choice your role to have a lot of feature</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className={cx('info')}>
                            <div className={cx('choice')}>
                                <Select onChange={(value) => setRole(value)} defaultValue="0">
                                    <Select.Option value="0">
                                        <img src={imgs.AnimateStudent} className={cx('animate')} />
                                        Student
                                    </Select.Option>
                                    <Select.Option value="1">
                                        <img src={imgs.AnimateTeacher} className={cx('animate')} />
                                        Teacher
                                    </Select.Option>
                                </Select>
                            </div>
                            <p className={cx('choice-desc')}>{roleData[role]?.desc}</p>
                            <Button type="primary" onClick={handleSubmit}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
