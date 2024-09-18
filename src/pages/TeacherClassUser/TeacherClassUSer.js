import classNames from 'classnames/bind';
import styles from './TeacherClassUser.module.scss';

const cx = classNames.bind(styles);

function TeacherClassUser() {
    return <div className={cx('wrap')}></div>;
}

export default TeacherClassUser;
