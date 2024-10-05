import classNames from 'classnames/bind';
import styles from './ClassItem.module.scss';
import imgs from '~/assets/Image';
import InfoItem from '../InfoItem/InfoItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ClassItem({ data }) {
    if (data) {
        const classItem = data.class;
        const progressData = data.progress;
        const infoData = data.info;
        const progress = (progressData.current_lesson / progressData.total_lesson) * 100;

        return (
            <div className={cx('wrap')}>
                <Link to={`${process.env.REACT_APP_ROOT}/class/${classItem.id}`}>
                    <img
                        className={cx('img')}
                        src={
                            classItem.thumbnail
                                ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${classItem.thumbnail}`
                                : imgs.NoImg
                        }
                    />
                </Link>
                <div className={cx('info')}>
                    <Link to={`${process.env.REACT_APP_ROOT}/class/${classItem.id}`}>
                        <span className={cx('title')}>{classItem.name}</span>
                    </Link>
                    <InfoItem data={infoData} />
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
                </div>
            </div>
        );
    }
}

export default ClassItem;
