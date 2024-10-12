import classNames from 'classnames/bind';
import styles from './HeaderZoom.module.scss';
import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';

const cx = classNames.bind(styles);

function HeaderZoom() {
    return (
        <div className={cx('wrap')}>
            <HeaderOnly />
        </div>
    );
}

export default HeaderZoom;
