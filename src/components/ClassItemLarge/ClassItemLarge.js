import classNames from 'classnames/bind';
import styles from './ClassItemLarge.module.scss';
import { Link } from 'react-router-dom';
import InfoItem from '../InfoItem/InfoItem';
import imgs from '~/assets/Image';
import extractContent from '~/utils/extractContent';

const cx = classNames.bind(styles);

function ClassItemLarge({ data }) {
    const classData = data.class;
    const infoItem = data.info;

    const { content } = extractContent(classData.description);
    console.log(classData);

    return (
        <div className={cx('wrap')}>
            <Link className={cx('img-link')} to={`${process.env.REACT_APP_ROOT}/class/${classData.id}`}>
                <img
                    className={cx('img')}
                    src={
                        classData.thumbnail
                            ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${classData.thumbnail}`
                            : imgs.NoImg
                    }
                />
            </Link>
            <div className={cx('info')}>
                <div className={cx('wrap-info')}>
                    <h2 className={cx('title')}>
                        <Link to={`${process.env.REACT_APP_ROOT}/class/${classData.class_id}`}>
                            {classData.title}
                        </Link>
                    </h2>
                    <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <InfoItem data={infoItem} />
            </div>
        </div>
    );
}

export default ClassItemLarge;
