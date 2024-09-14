import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Tippy from '@tippyjs/react/headless';
import ClassItem from '~/components/ClassItem/ClassItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Classes() {
    return (
        <li className={cx('item')}>
            <Tippy
                interactive
                placement="bottom-end"
                trigger="click"
                render={(attrs) => (
                    <div {...attrs} className={cx('class-drop')}>
                        <div className={cx('class-head')}>
                            <h3 className={cx('class-title')}>My Classes</h3>
                            <Link className={cx('class-btn')}>See all</Link>
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
                <h2 className={cx('class-title')}>My Classes</h2>
            </Tippy>
        </li>
    );
}

export default Classes;
