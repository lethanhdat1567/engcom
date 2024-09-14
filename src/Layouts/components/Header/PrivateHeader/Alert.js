import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import AlertItem from '~/components/AlertItem/AlertItem';

const cx = classNames.bind(styles);

function Alert() {
    return (
        <li className={cx('item')}>
            <Tippy
                interactive
                trigger="click"
                placement="bottom-end"
                render={(attrs) => (
                    <div {...attrs} className={cx('class-drop')}>
                        <div className={cx('class-head')}>
                            <h3 className={cx('class-title')}>My Notification</h3>
                        </div>
                        <div className={cx('alert-body')}>
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                            <AlertItem />
                        </div>
                    </div>
                )}
            >
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faBell} className="fa-xl" />
                </span>
            </Tippy>
        </li>
    );
}

export default Alert;
