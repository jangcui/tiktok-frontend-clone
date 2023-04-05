import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as Services from '~/Services/Services';
import styles from './Home.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContainerVideoList from '~/component/ContainerVideoList';
import Loading from '~/component/Loading';
import ChangeTitle from '~/component/ChangeTitle/ChangeTitle';

const cx = classNames.bind(styles);

function Home() {
    const [dataHome, setDataHome] = useState([]);
    const [page, setPage] = useState(Math.floor(Math.random() * 18 + 1));
    const handleNextRender = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        Services.getVideoList({ page: page }).then((data) => {
            if (data) {
                setDataHome((preUser) => [...preUser, ...data.filter((user) => !user.user.is_followed)]);
            }
        });
    }, [page]);

    useEffect(() => {
        if (page >= 18 || page === 0) {
            setPage(1);
        }
    }, [page]);
    return (
        <div className={cx('wrapper')}>
            <ChangeTitle title={'Make your day'} />
            <InfiniteScroll
                dataLength={dataHome.length}
                next={handleNextRender}
                hasMore={true}
                loader={
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                }
            >
                <ContainerVideoList dataList={dataHome} />
            </InfiniteScroll>
        </div>
    );
}

export default Home;
