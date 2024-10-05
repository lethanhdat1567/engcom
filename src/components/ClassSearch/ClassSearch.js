import classNames from 'classnames/bind';
import styles from './ClassSearch.module.scss';
import { Link } from 'react-router-dom';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function ClassSearch({ data }) {
    const classData = data.class;
    return (
        <Link to={`${process.env.REACT_APP_ROOT}/class/${data.class_id}`}>
            <div className={cx('wrap')}>
                <img
                    src={
                        classData.thumbnail
                            ? `${process.env.REACT_APP_BACKEND_UPLOAD}/${classData.thumbnail}`
                            : imgs.NoImg
                    }
                    className={cx('avatar')}
                />
                <p className={cx('desc')}>{classData.title}</p>
            </div>
        </Link>
    );
}

export default ClassSearch;
