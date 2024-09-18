import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Tippy from '@tippyjs/react/headless';
import ClassItem from '~/components/ClassItem/ClassItem';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Classes() {
    const [isShow, setShow] = useState(false);
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/my-class') {
            return;
        }
        setShow(true);
    };

    return (
        <li className={cx('item')}>
            <Tippy
                interactive
                placement="bottom-end"
                visible={isShow}
                onClickOutside={() => setShow(false)}
                render={(attrs) => (
                    <div {...attrs} className={cx('class-drop')}>
                        <div className={cx('class-head')}>
                            <h3 className={cx('class-title')}>My Classes</h3>
                            {/* Fix link */}
                            <Link
                                to={`${process.env.REACT_APP_ROOT}/my-class`}
                                className={cx('class-btn')}
                                onClick={() => setShow(false)}
                            >
                                See all
                            </Link>
                        </div>
                        <div className={cx('class-body')}>
                            <ClassItem />
                            <ClassItem />
                            <ClassItem />
                            <ClassItem />
                            <ClassItem />
                            <ClassItem />
                        </div>
                    </div>
                )}
            >
                <h2 className={cx('class-title')} onClick={handleClick}>
                    My Classes
                </h2>
            </Tippy>
        </li>
    );
}

export default Classes;
