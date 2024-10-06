import classNames from 'classnames/bind';
import style from './NoContentLoading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function NoContenLoading() {
    return (
        <div className={cx('wrap')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faGear} className="fa-solid fa-cog fa-spin" />
            </span>
            <span className={cx('title')}>Lesson is in progress...</span>
        </div>
    );
}

export default NoContenLoading;
