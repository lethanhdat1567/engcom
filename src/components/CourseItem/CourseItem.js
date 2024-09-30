import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LessonItem from './LessonItem';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { teacher } from '~/redux/reducer/TeacherSlice';

const cx = classNames.bind(styles);

function CourseItem({ data }) {
    const dispatch = useDispatch();
    const lessons = useSelector((state) => state.teacher.lessons);

    const handleDelete = () => {
        dispatch(teacher.actions.deleteCourse(data.id));
    };
    const lessonData = lessons.filter((item) => item.course_id === data.id);
    return (
        <div className={cx('course')}>
            <div className={cx('wrap')}>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>{data.name}</h3>
                    <p className={cx('lesson')}>{lessonData.length} lessons</p>
                </div>
                <Button type="primary" danger onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default CourseItem;
