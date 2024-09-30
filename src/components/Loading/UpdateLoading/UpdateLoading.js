import classNames from 'classnames/bind';
import styles from './UpdateLoading.module.scss';
import { ScaleLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function UpdateLoading() {
    return (
        <div className={cx('wrap')}>
            <ScaleLoader />
        </div>
    );
}

export default UpdateLoading;
