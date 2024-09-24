import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import SearchContent from './SearchContent';
import { useEffect, useState } from 'react';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Search() {
    const [searchHoder, setSearchHoder] = useState('Search classes, users, blogs, ...');
    const handleResize = () => {
        if (window.innerWidth < 766) {
            setSearchHoder('Search...');
        } else {
            setSearchHoder('Search classes, users, blogs, ...');
        }
    };

    const searchData = [
        {
            type: 'Users',
            children: [
                {
                    title: 'Le Thanh Dat',
                    banner: imgs.unsetAvatar,
                },
                {
                    title: 'Le Thanh Dat',
                    banner: imgs.unsetAvatar,
                },
            ],
        },
        {
            type: 'Classes',
            children: [
                {
                    title: 'Lop hoc vo',
                    banner: imgs.unsetAvatar,
                },
            ],
        },
        {
            type: 'Blogs',
            children: [
                {
                    title: 'Cach hoc tieng anh',
                    banner: imgs.unsetAvatar,
                },
            ],
        },
    ];

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <Tippy
                interactive
                placement="bottom"
                trigger="click"
                render={(attrs) => {
                    return (
                        <div {...attrs} tabIndex={'-1'} className={cx('dropdown')}>
                            <div className={cx('drop-header')}>
                                <span className={cx('search-icon')}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <p className={cx('head-desc')}>Result of 'React'</p>
                            </div>
                            <div className={cx('search-content')}>
                                {searchData.map((item, index) => {
                                    return <SearchContent key={index} data={item} />;
                                })}
                            </div>
                        </div>
                    );
                }}
            >
                <div className={cx('search')}>
                    <button className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <input className={cx('input')} placeholder={searchHoder} spellCheck={false} />
                </div>
            </Tippy>
        </>
    );
}

export default Search;
