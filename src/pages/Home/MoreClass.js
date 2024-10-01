import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function MoreClass() {
    return <div className={cx('more')}></div>;
}

export default MoreClass;
