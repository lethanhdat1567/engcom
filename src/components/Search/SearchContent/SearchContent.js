import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import Button from '~/components/Button';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function SearchContent() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h3 className={cx('title')}>Classes</h3>
                <Button text classNames={cx('btn')}>
                    Show more
                </Button>
            </div>
            <div className={cx('content')}>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
            </div>
        </div>
    );
}

export default SearchContent;
