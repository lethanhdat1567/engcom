import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>404</h1>
            <span className={cx('title-sub')}>Could not find content 😓</span>
            <p className={cx('desc')}>
                The URL for this content has changed or no longer exists.
                <br /> If you have this URL saved, try accessing it from the homepage instead of using the
                saved URL.
            </p>
            <Button classNames={cx('btn')} to={'/'} save>
                GO TO HOMEPAGE
            </Button>
        </div>
    );
}

export default NotFound;
