import classNames from 'classnames/bind';
import { NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import styles from './SearchPage.module.scss';
import Videos from './Videos';

import User from './User';

const cx = classNames.bind(styles);
const items = [
    {
        id: 1,
        path: 'top',
        title: 'Top',
    },
    {
        id: 2,
        path: 'user',
        title: 'User',
    },
    {
        id: 3,
        path: 'videos',
        title: 'Videos',
    },
];
function SearchPage() {
    const search = useLocation().search;
    const value = search.slice(search.lastIndexOf('=') + 1);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('tab-btn')}>
                    {items.map((item) => (
                        <NavLink to={item.path + search} key={item.id}>
                            {({ isActive }) => (
                                <>
                                    <span className={cx('tab-items', isActive && 'active-top')}>
                                        <p>{item.title}</p>
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
                <div className={cx('content')}>
                    <Routes>
                        <Route path="top" element={<User valueSearch={value} />} />
                        <Route path="user" element={<User valueSearch={value} />} />
                        <Route path="videos" element={<Videos />} />
                    </Routes>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default SearchPage;
