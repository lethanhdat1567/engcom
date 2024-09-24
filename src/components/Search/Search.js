import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import SearchContent from './SearchContent';
import { useEffect, useRef, useState } from 'react';
import imgs from '~/assets/Image';
import useDebounce from '~/hooks/useDebounce';
import { requestSearch } from '~/requestApi/requestSearch';

const cx = classNames.bind(styles);

function Search() {
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // resize
    const handleResize = () => {
        if (window.innerWidth < 766) {
            setSearchHoder('Search...');
        } else {
            setSearchHoder('Search classes, users, blogs, ...');
        }
    };
    // Hooks
    const [searchValue, setSearchValue] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [searchHoder, setSearchHoder] = useState('Search classes, users, blogs, ...');
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);
    const [searchData, setSearchData] = useState([]);

    const debounceValue = useDebounce(searchValue, 500);
    const handleChange = (e) => {
        if (e.target.value.trim()) {
            setSearchValue(e.target.value);
            setShowSearch(true);
        } else {
            setSearchData([]);
            setSearchValue('');
            setShowSearch(false);
        }
    };
    const handleClear = () => {
        setSearchValue('');
        setShowSearch(false);
        inputRef.current.focus();
        setSearchData([]);
    };
    const handleDropdown = () => {
        if (searchValue) {
            setShowSearch(true);
        }
    };

    // request API
    useEffect(() => {
        if (debounceValue.trim()) {
            setLoading(true);
            try {
                requestSearch(debounceValue)
                    .then((res) => {
                        setLoading(false);
                        setSearchData(res);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [debounceValue]);
    return (
        <>
            <Tippy
                interactive
                placement="bottom"
                visible={showSearch}
                onClickOutside={() => setShowSearch(false)}
                render={(attrs) => {
                    return (
                        <div {...attrs} tabIndex={'-1'} className={cx('dropdown')}>
                            <div className={cx('drop-header')}>
                                {loading ? (
                                    <span className={cx('search-icon')}>
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            className="fa-spinner fa-spin-pulse fa-spin-reverse"
                                        />
                                    </span>
                                ) : (
                                    <span className={cx('search-icon')}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                )}

                                <p className={cx('head-desc')}>Result of "{searchValue}"</p>
                            </div>
                            {searchData.length > 0 && (
                                <div className={cx('search-content')}>
                                    {searchData.map((item, index) => {
                                        return <SearchContent key={index} data={item} />;
                                    })}
                                </div>
                            )}
                        </div>
                    );
                }}
            >
                <div className={cx('search')}>
                    <button className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <input
                        ref={inputRef}
                        className={cx('input')}
                        placeholder={searchHoder}
                        spellCheck={false}
                        value={searchValue}
                        onChange={(e) => handleChange(e)}
                        onClick={handleDropdown}
                    />
                    {searchValue && (
                        <span className={cx('btn-sub')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#a59e9e' }} />
                        </span>
                    )}
                </div>
            </Tippy>
        </>
    );
}

export default Search;
