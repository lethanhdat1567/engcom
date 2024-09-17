import classNames from 'classnames/bind';
import styles from './Course.module.scss';

const cx = classNames.bind(styles);

function Course() {
    return <div className={cx('wrap')}>Course</div>;
}

export default Course;
