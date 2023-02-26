import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserContext from '~/component/Contexts/UserContext/UserContext';
import { LockIcon, UserIcon } from '~/component/Icons';
import Loading from '~/component/Loading';
import ModalDetailVideo from '~/component/ModalDetailVideo';
import { useDebounce } from '~/hook';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import * as Services from '~/Services/Services';
import styles from './Profile.module.scss';
import Userinfo from './Userinfo';
import VideosProfile from './VideosProfile';

const cx = classNames.bind(styles);

function Profile() {
    const user = UserContext();
    const [isEditBtn, setIsEditBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataVideo, setDataVideo] = useState({});
    const [listVideo, setListVideo] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [index, setIndex] = useState(0);

    const pathName = useLocation();
    const nickName = pathName.pathname;
    const dataUser = useDebounce(data, 800);

    useEffect(() => {
        if (dataUser) {
            setIsLoading(false);
            setListVideo(dataUser.videos);
        }
    }, [dataUser]);
    useEffect(() => {
        if (user) {
            if (nickName === `/@${user.nickname}`) {
                setIsEditBtn(true);
            } else {
                setIsEditBtn(false);
            }
        }
    }, [nickName, user]);

    useEffect(() => {
        setIsLoading(true);
        Services.getAnUser(nickName).then((data) => {
            if (data) {
                console.log(data);
                setData(data);
            }
        });
    }, [nickName]);
    const handleClickVideo = (events, index) => {
        setDataVideo(events);
        setIsOpen(true);
        setIndex(index);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header small />
            </div>
            <div className={cx('container')}>
                <ModalDetailVideo
                    dataList={listVideo}
                    dataVideo={dataVideo}
                    index={index}
                    setIndex={setIndex}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
                <Sidebar small />
                {isLoading ? (
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className={cx('content')}>
                            <Userinfo dataUser={dataUser} isEditBtn={isEditBtn} />
                            <div className={cx('wrap-videos')}>
                                <div className={cx('btn-toggle')}>
                                    <span
                                        className={cx('btn-video', activeBtn && 'active-btn')}
                                        onClick={() => setActiveBtn(false)}
                                    >
                                        Video
                                    </span>
                                    <span
                                        className={cx('btn-liked', !activeBtn && 'active-btn')}
                                        onClick={() => setActiveBtn(true)}
                                    >
                                        {!isEditBtn ? <LockIcon /> : <UserIcon />} Liked
                                    </span>
                                    <span className={cx('slider', activeBtn && 'active-slider')}></span>
                                </div>
                                {!activeBtn ? (
                                    <VideosProfile data={listVideo} onClick={handleClickVideo} isEditBtn={isEditBtn} />
                                ) : (
                                    <div className={cx('private')}>
                                        {!isEditBtn ? (
                                            <>
                                                <LockIcon className={cx('icon')} />
                                                <h2>This user's liked videos are private </h2>
                                                <p>
                                                    Videos liked by
                                                    <i>
                                                        <b>{dataUser.nickname}</b>
                                                    </i>
                                                    are currently hidden
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <UserIcon className={cx('icon')} />
                                                <h2>No liked videos yet </h2>
                                                <p>Videos you liked will appear here</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
