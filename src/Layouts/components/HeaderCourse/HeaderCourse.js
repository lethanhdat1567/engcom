import classNames from 'classnames/bind';
import styles from './HeaderCourse.module.scss';
import Logo from '~/components/Logo/Logo';
import Note from '~/components/Note/Note';
import Alert from '../Header/PrivateHeader/Alert';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';
import ProfileCourse from '~/components/ProfileCourse/ProfileCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderCourse() {
    const navigate = useNavigate();
    return (
        <div className={cx('wrap')}>
            <div className={cx('left')}>
                <div className={cx('icon-back')} onClick={() => navigate(-1)}>
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

export default HeaderCourse;
