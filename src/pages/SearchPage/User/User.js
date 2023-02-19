import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { CheckIcon, DownIcon } from '~/component/Icons';
import Image from '~/component/Image';
import SkeletonLoader from '~/component/SkeletonLoader';
import * as Services from '~/Services/Services';

import styles from './User.module.scss';
const cx = classNames.bind(styles);
function User({ valueSearch }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setIsLoadMore(true);
        Services.search({ page: 1, type: 'more', q: valueSearch }).then((data) => {
            setIsLoading(false);
            setData(data);
        });
    }, [valueSearch]);

    const handleNextRender = () => {
        setPage(page + 1);
        console.log(page);
        Services.search({ page: page, type: 'more', q: valueSearch }).then((data) => {
            if (data.length === 0) {
                setIsLoadMore(false);
            }
            console.log(page);

            setData((prev) => [...prev, ...data]);
        });
    };
    console.log(data);
    return (
        <>
            {isLoading ? (
                <div className={cx('loading')}>
                    <SkeletonLoader amount={6} />
                </div>
            ) : (
                <>
                    {data.map((data, index) => (
                        <div className={cx('wrapper')} key={index}>
                            <div className={cx('wrapper')}>
                                <Link to={`/@${data.nickname}`}>
                                    <div className={cx('container')}>
                                        <div className={cx('user')}>
                                            <Image className={cx('avatar-user')} src={data.avatar} alt="avatar" />
                                            <div className={cx('info-user')}>
                                                <div className={cx('name')}>
                                                    {data.full_name} {data.tick && <CheckIcon />}{' '}
                                                </div>
                                                <div className={cx('title')}>
                                                    <span className={cx('value-search')}>{valueSearch} :/</span>
                                                    <span className={cx('nick-name')}>{data.nickname}</span>
                                                    <span className={cx('count')}>{data.followings_count}</span>
                                                    <span>Follower</span>
                                                </div>
                                                <div className={cx('bio')}>{data.bio}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {isLoadMore ? (
                <div className={cx('load-more')}>
                    <span className={cx('btn-more')} onClick={handleNextRender}>
                        Load more <DownIcon />
                    </span>
                </div>
            ) : (
                <div className={cx('load-more')}>
                    <b>Yay! You have seen it all</b>
                </div>
            )}
            <Outlet />
        </>
    );
}

export default User;
