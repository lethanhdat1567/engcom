import classNames from 'classnames/bind';
import styles from './CommuteItem.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CommuItem({ data }) {
    console.log(data.to);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{data.title}</h2>
                    <p className={cx('desc')}>{data.desc}</p>
                </div>
                <Link className={cx('img-wrap')} to={`${process.env.REACT_APP_ROOT}/community${data.to}`}>
                    <img className={cx('img')} src={data.img} />
                </Link>
            </div>
            <Button to={`${process.env.REACT_APP_ROOT}/community${data.to}`} primary classNames={cx('btn')}>
                Explore
            </Button>
        </div>
    );
}

export default CommuItem;
