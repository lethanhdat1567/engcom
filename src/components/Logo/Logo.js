import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { activeLesson } from '~/redux/reducer/ActiveLesson';

const cx = classNames.bind(styles);

function Logo({ white, className = false }) {
    const dispatch = useDispatch();

    const carts = useSelector((state) => state.teacher.carts);
    const courses = useSelector((state) => state.teacher.courses);
    const activeLessonData = useSelector((state) => state.activeLesson.lesson);
    const handleNavigate = () => {
        if (Object.keys(carts).length > 0 || courses.length > 0 || Object.keys(activeLessonData).length > 0) {
            dispatch(teacher.actions.resetState());
            dispatch(activeLesson.actions.deleteActiveLesson());
        }
    };

    return (
        <Link to={'/'} className={cx('logo', `${className}`)} onClick={handleNavigate}>
            <span className={cx('logo-icon', { white: white })}>
                <FontAwesomeIcon icon={faBookOpenReader} className="fa-xl" />
            </span>
            <p className={cx('logo-desc', { white: white })}>Education Community</p>
        </Link>
    );
}

export default Logo;
