import classNames from 'classnames/bind';
import styles from './TeacherClass.module.scss';

const cx = classNames.bind(styles);

function TeacherClass() {
    return <div className={cx('wrap')}></div>;
}

export default TeacherClass;
