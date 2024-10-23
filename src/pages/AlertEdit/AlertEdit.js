import classNames from 'classnames/bind';
import styles from './AlertEdit.module.scss';
import AlertItem from '~/Layouts/components/AlertModal/components/AlertItem/AlertItem';
import CreateAlert from './components/CreateAlert/CreateAlert';

const cx = classNames.bind(styles);

function AlertEdit() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('body')}>
                <CreateAlert />
                <AlertItem />
                <AlertItem />
                <AlertItem />
            </div>
        </div>
    );
}

export default AlertEdit;
