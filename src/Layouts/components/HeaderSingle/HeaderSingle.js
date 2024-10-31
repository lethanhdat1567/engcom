import classNames from 'classnames/bind';
import styles from './HeaderSingle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import HeaderAlert from '~/components/HeaderAlert/HeaderAlert';
import ProfileHeader from '~/components/ProfileHeader/ProfileHeader';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Note from '~/components/Note/Note';

const cx = classNames.bind(styles);

function HeaderSingle({ transparent }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    const validateUrl = () => {
        if (location.pathname == '/community/meeting') {
            return false;
        }
        return true;
    };

    return (
        <div
            className={cx('wrap', { border: !transparent })}
            style={{ background: transparent ? 'transparent ' : '' }}
        >
            <div className={cx('left')}>
                <Link to="/" className={cx('logo')}>
                    <FontAwesomeIcon icon={faBookOpenReader} className="fa-xl" />
                </Link>
                {validateUrl() && (
                    <div className={cx('back-wrap')} onClick={() => navigate(-1)}>
                        <span className={cx('icon')}>
                            <span className={cx('font-icon')}>
                                <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                            </span>
                            <span className={cx('back-desc')}>Back</span>
                        </span>
                    </div>
                )}
            </div>
            {Object.keys(user).length > 0 && user.role_id !== 4 && (
                <div className={cx('right')}>
                    <Note />
                    <ProfileHeader />
                </div>
            )}
        </div>
    );
}

export default HeaderSingle;
