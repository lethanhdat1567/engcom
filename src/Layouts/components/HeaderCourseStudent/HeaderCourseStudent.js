import classNames from 'classnames/bind';
import styles from './HeaderCourseStudent.module.scss';
import Logo from '~/components/Logo/Logo';
import Note from '~/components/Note/Note';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function HeaderCourseStudent() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <div className={cx('icon-back')} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="fa-xl" />
                </div>
                <Logo white />
            </div>
            <div className={cx('right')}>
                <Note white />
                <ProfileCourse />
            </div>
        </div>
    );
}

export default HeaderCourseStudent;
