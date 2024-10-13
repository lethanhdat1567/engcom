import classNames from 'classnames/bind';
import styles from './ClassCart.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ClassCart({ data }) {
    const classData = data.class;
    const info = data.info;
    const progressData = data.progress;
    const progress = (progressData.current_lesson / progressData.total_lesson) * 100;
    console.log(progressData);

    return (
        <div className={cx('wrap')}>
            <Link to={`${process.env.REACT_APP_ROOT}/class/${classData.id}`} className={cx('banner')}>
                <img
                    src={
                        classData.thumbnail
                            ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${classData.thumbnail}`
                            : imgs.NoImg
                    }
                    className={cx('img')}
                />
            </Link>
            <div className={cx('info')}>
                <Link to={`${process.env.REACT_APP_ROOT}/class/${classData.id}`}>
                    <h3 className={cx('title')}>{classData.name}</h3>
                </Link>
                <div className={cx('process')}>
                    <div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: '#f05123',
                            transition: 'ease 0.4s',
                        }}
                    ></div>
                </div>
                <div className={cx('footer')}>
                    <InfoItem data={info} />
                </div>
            </div>
        </div>
    );
}

export default ClassCart;
