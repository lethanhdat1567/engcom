import classNames from 'classnames/bind';
import styles from './TeacherClassComment.module.scss';
import Comment from '../ClassDetail/Comment/Comment';

const cx = classNames.bind(styles);

function TeacherClassComment() {
    return (
        <div className={cx('wrap')}>
            <Comment />
        </div>
    );
}

export default TeacherClassComment;
