import classNames from 'classnames/bind';
import styles from './HeaderCreateCourse.module.scss';
import Logo from '~/components/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Note from '~/components/Note/Note';

const cx = classNames.bind(styles);

function HeaderCreateCourse() {
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
                <Note />
                <Button type="primary">Export course</Button>
            </div>
        </div>
    );
}

export default HeaderCreateCourse;
