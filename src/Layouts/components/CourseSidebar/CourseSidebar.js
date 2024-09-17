import classNames from 'classnames/bind';
import styles from './CourseSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Course from './Course';

const cx = classNames.bind(styles);

function CourseSidebar({ showNav }) {
    return (
        <div className={cx('navbar', { show: showNav })}>
            <div className={cx('heading')}>Unit process</div>
            <Course />
            <Course />
            <Course />
            <Course />
        </div>
    );
}

export default CourseSidebar;
