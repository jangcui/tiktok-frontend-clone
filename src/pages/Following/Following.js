import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Following.module.scss';

import * as Services from '~/Services/Services';

import ContainerVideoList from '~/component/ContainerVideoList';

import UserContext from '~/component/Contexts/UserContext/UserContext';
import Loading from '~/component/Loading';
import SuggestedPage from './SuggestedPage';
import ChangeTitle from '~/component/ChangeTitle';

const cx = classNames.bind(styles);

function Following() {
    const { currentUser } = UserContext();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const handleNextRender = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        if (currentUser) {
            Services.getVideoList({ type: 'following', page: page })
                .then((data) => {
                    if (data) {
                        setData((preUser) => [...preUser, ...data]);
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [page, currentUser]);

    return (
        <div className={cx('wrapper')}>
            <ChangeTitle title={'Following'} />
            {!currentUser || data.length === 0 ? (
                <SuggestedPage />
            ) : (
                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={true}
                    next={handleNextRender}
                    loader={
                        <div className={cx('loading')}>
                            <Loading />
                        </div>
                    }
                >
                    <ContainerVideoList dataList={data} />
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Following;
