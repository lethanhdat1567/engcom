import classNames from 'classnames/bind';
import styles from './ItemChoice.module.scss';
import { Link } from 'react-router-dom';
import { google } from '~/assets/Icon';

const cx = classNames.bind(styles);

function ItemChoice({ data, onClick, ...props }) {
    return (
        <Link className={cx('wrap')} onClick={onClick} {...props}>
            <span className={cx('icon')}>{data.icon}</span>
            <span className={cx('desc')}>{data.desc}</span>
        </Link>
    );
}

export default ItemChoice;
