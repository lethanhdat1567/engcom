import classNames from 'classnames/bind';
import styles from './ClassDetail.module.scss';
import imgs from '~/assets/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment/Comment';

const cx = classNames.bind(styles);

function ClassDetail() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('row')}>
                <div className={cx('col col-8')}>
                    <div className={cx('design')}>Design</div>
                    <Comment />
                </div>
                <div className={cx('col col-4')}>
                    <div className={cx('info')}>
                        <img className={cx('banner')} src={imgs.banner1} />
                        <span className={cx('costs')}>Free Class</span>
                        <Button
                            primary
                            to={`${process.env.REACT_APP_ROOT}/course/1`}
                            classNames={cx('sub-btn')}
                        >
                            Join class
                        </Button>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className={cx('sub-desc')}>Trinh do co ban</span>
                            </li>
                            <li className={cx('item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className={cx('sub-desc')}>Trinh do co ban</span>
                            </li>
                            <li className={cx('item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className={cx('sub-desc')}>Trinh do co ban</span>
                            </li>
                            <li className={cx('item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className={cx('sub-desc')}>Trinh do co ban</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassDetail;
