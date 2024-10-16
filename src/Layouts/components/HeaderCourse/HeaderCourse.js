import classNames from 'classnames/bind';
import styles from './HeaderCourse.module.scss';
import Logo from '~/components/Logo/Logo';
import Note from '~/components/Note/Note';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function HeaderCourse() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <div className={cx('back-wrap')} onClick={handleBack}>
                    <span className={cx('back-icon')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span className={cx('back-text')}>Back</span>
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

export default HeaderCourse;
