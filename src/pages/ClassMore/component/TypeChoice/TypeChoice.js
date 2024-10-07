import classNames from 'classnames/bind';
import styles from './TypeChoice.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TypeChoice({ utils }) {
    const { typeActive, setTypeActive } = utils;
    const [dropActive, setDropActive] = useState(false);
    const typeData = [
        {
            title: 'All',
            name: 'all',
        },
        {
            title: 'Math',
            name: 'math',
        },
        {
            title: 'Physic',
            name: 'physic',
        },
        {
            title: 'English',
            name: 'english',
        },
        {
            title: 'Other',
            name: 'other',
        },
    ];
    console.log(typeActive);

    return (
        <div className={cx('wrap')}>
            <Tippy
                interactive
                visible={dropActive}
                onClickOutside={() => setDropActive(false)}
                placement="bottom"
                render={(attrs) => (
                    <div {...attrs} tabIndex="-1" className={cx('dropdown')}>
                        <ul className={cx('list')}>
                            {typeData.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={cx('item')}
                                        onClick={() => {
                                            setTypeActive(index);
                                            setDropActive(false);
                                        }}
                                    >
                                        {item.title}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            >
                <div className={cx('body', { active: dropActive })} onClick={() => setDropActive(true)}>
                    <span className={cx('title')}>{typeData[typeActive].title}</span>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>
            </Tippy>
        </div>
    );
}

export default TypeChoice;
