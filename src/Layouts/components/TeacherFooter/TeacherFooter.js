import classNames from 'classnames/bind';
import styles from './TeacherFooter.module.scss';
import { arrowBackWhite, navWhite } from '~/assets/Icon';

const cx = classNames.bind(styles);

function TeacherFooter({ setShowNav, showNav }) {
    return (
        <footer className={cx('footer')}>
            <div className={cx('side-bar')} onClick={() => setShowNav(!showNav)}>
                <span className={cx('side-bar-icon')}>{showNav ? arrowBackWhite : navWhite}</span>
            </div>
        </footer>
    );
}

export default TeacherFooter;
