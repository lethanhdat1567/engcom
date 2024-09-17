import classNames from 'classnames/bind';
import styles from './CourseFooter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { courseBack, sideBar } from '~/assets/Icon';

const cx = classNames.bind(styles);

function CourseFooter({ setShowNav, showNav }) {
    return (
        <footer className={cx('footer')}>
            <span className={cx('unit')}>Unit 1: How to eat</span>
            <div className={cx('lesson')}>
                <div className={cx('btn-wrap')}>
                    <span className={cx('btn-icon')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    <button className={cx('btn')}>Previous lesson</button>
                </div>
                <div className={cx('btn-wrap', 'outlined')}>
                    <button className={cx('btn')}>Next lesson</button>
                    <span className={cx('btn-icon')}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                </div>
            </div>
            <div className={cx('side-bar')} onClick={() => setShowNav(!showNav)}>
                <span className={cx('side-bar-icon')}>{showNav ? courseBack : sideBar}</span>
            </div>
        </footer>
    );
}

export default CourseFooter;
