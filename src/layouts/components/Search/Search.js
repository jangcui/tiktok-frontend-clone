import className from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import AccountItems from '~/component/AccountItems';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as Services from '~/Services/Services';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { useDebounce } from '~/hook';
import { SearchIcon } from '~/component/Icons';
import styles from './Search.module.scss';

const cx = className.bind(styles);

function Search() {
    const search = useLocation().search;
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 800);

    const idValue = useRef();
    useEffect(() => {
        const query = search.slice(search.lastIndexOf('=') + 1);
        if (query) {
            setSearchValue(query);
        }
    }, [search]);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);
            const result = await Services.search({ page: 1, type: 'less', q: debouncedValue });
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue, searchValue]);

    const handleClear = () => {
        setSearchValue('');
        idValue.current.focus();
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    console.log(searchResult);
    return (
        <>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItems key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={idValue}
                        value={searchValue}
                        placeholder="Search accounts and videos..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <Link to={searchValue.trim() && `/search/top?type=more&q=${searchValue}`}>
                        <button
                            className={cx('search-btn')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleHideResult()}
                        >
                            <SearchIcon />
                        </button>
                    </Link>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;
