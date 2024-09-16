import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Logo from '~/components/Logo/Logo';
import HeaderSingle from '../components/HeaderSingle/HeaderSingle';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrap')}>
            <HeaderSingle />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default HeaderOnly;
