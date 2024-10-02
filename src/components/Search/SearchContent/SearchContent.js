import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import Button from '~/components/Button';
import AccountItem from '~/components/AccountItem';
import ValidateData from './ValidateData';

const cx = classNames.bind(styles);

function SearchContent({ data }) {
    console.log(data);

    return (
        <div className={cx('wrap')}>
            {data.children.length > 0 && (
                <>
                    <div className={cx('heading')}>
                        <h3 className={cx('title')}>{data.type}</h3>
                        <Button text classNames={cx('btn')}>
                            Show more
                        </Button>
                    </div>
                    <div className={cx('content')}>
                        <ValidateData data={data} />
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchContent;
