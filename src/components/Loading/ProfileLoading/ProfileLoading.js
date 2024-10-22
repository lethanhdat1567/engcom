import classNames from 'classnames/bind';
import styles from './ProfileLoading.module.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function ProfileLoading() {
    return (
        <div className={cx('wrap')}>
            <Skeleton height={250} />
            <div className="row mt-4">
                <div className="col-4">
                    <Skeleton height={200} />
                </div>
                <div className="col-8">
                    <Skeleton height={50} count={6} style={{ margin: '10px 0px' }} />
                </div>
            </div>
        </div>
    );
}

export default ProfileLoading;
