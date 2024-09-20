import classNames from 'classnames/bind';
import styles from './Role.module.scss';
import imgs from '~/assets/Image';
import { Button, Select } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Role() {
    const [role, setRole] = useState('student');
    const roleData = {
        student: {
            img: imgs.StudentRole,
            desc: 'As a student, you can access course materials, participate in discussions, and track your progress.',
        },
        teacher: {
            img: imgs.TeacherRole,
            desc: 'As a teacher, you can create courses, manage students, and monitor their performance.',
        },
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
                                <Select onChange={(value) => setRole(value)} defaultValue="student">
                                    <Select.Option value="student">
                                        <img src={imgs.AnimateStudent} className={cx('animate')} />
                                        Student
                                    </Select.Option>
                                    <Select.Option value="teacher">
                                        <img src={imgs.AnimateTeacher} className={cx('animate')} />
                                        Teacher
                                    </Select.Option>
                                </Select>
                            </div>
                            <p className={cx('choice-desc')}>{roleData[role]?.desc}</p>
                            <Button type="primary">Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
