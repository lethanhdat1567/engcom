import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';

const cx = classNames.bind(styles);

function LessonItem() {
    return <div className={cx('lesson')}>lesson 1</div>;
}

export default LessonItem;
