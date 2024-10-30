import classNames from 'classnames/bind';
import styles from './CourseFooter.module.scss';
import { courseBack, sideBar } from '~/assets/Icon';

const cx = classNames.bind(styles);

function CourseFooterCreate({ setShowNav, showNav }) {
    return (
        <footer className={cx('footer')}>
            <span className={cx('unit')}>Unit 1: How to eat</span>
            <div className={cx('side-bar')} onClick={() => setShowNav(!showNav)}>
                <span className={cx('side-bar-icon')}>{showNav ? courseBack : sideBar}</span>
            </div>
        </footer>
    );
}

export default CourseFooterCreate;
