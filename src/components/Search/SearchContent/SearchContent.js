import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import Button from '~/components/Button';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function SearchContent({ data }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h3 className={cx('title')}>{data.type}</h3>
                <Button text classNames={cx('btn')}>
                    Show more
                </Button>
            </div>
            <div className={cx('content')}>
                {data.children.map((item, index) => {
                    return <AccountItem key={index} data={item} />;
                })}
            </div>
        </div>
    );
}

export default SearchContent;
