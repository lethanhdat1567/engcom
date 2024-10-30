import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import ValidateData from './ValidateData';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchContent({ data, searchValue, setShowSearch }) {
    return (
        <div className={cx('wrap')}>
            {data.children.length > 0 && (
                <>
                    <div className={cx('heading')}>
                        <h3 className={cx('title')}>{data.type}</h3>
                        <Link
                            className={cx('btn')}
                            onClick={() => setShowSearch(false)}
                            to={`${process.env.REACT_APP_ROOT}/search?q=${searchValue}&type=more`}
                        >
                            Show more
                        </Link>
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
