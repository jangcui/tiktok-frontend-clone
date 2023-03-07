import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '~/component/Contexts/UserContext/UserContext';
import { LockIcon, UserIcon } from '~/component/Icons';
import Loading from '~/component/Loading';
import ModalDetailVideo from '~/component/modals/ModalDetailVideo';
import { useDebounce } from '~/hook';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import * as Services from '~/Services';
import styles from './Profile.module.scss';
import Userinfo from './Userinfo';
import VideosProfile from './VideosProfile';

const cx = classNames.bind(styles);

function Profile() {
    const { currentUser } = UserContext();
    const { nickname } = useParams();
    const [isEditBtn, setIsEditBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [dataVideo, setDataVideo] = useState({});
    const [data, setData] = useState({});

    const [listVideo, setListVideo] = useState([]);
    const [likedVideo, setLikedVideo] = useState([]);
    const [index, setIndex] = useState(0);

    const dataUser = useDebounce(data, 800);

    useEffect(() => {
        if (dataUser) {
            setIsLoading(false);
            setListVideo(dataUser.videos);
        }
    }, [dataUser]);
    useEffect(() => {
        if (currentUser) {
            if (nickname === currentUser.nickname) {
                setIsEditBtn(true);
            } else {
                setIsEditBtn(false);
            }
        }
    }, [nickname, currentUser]);

    useEffect(() => {
        setIsLoading(true);
        const fetchApi = async () => {
            setIsLoading(true);
            const result = await Services.getAnUser(nickname);
            setData(result);
        };
        fetchApi();
    }, [nickname]);

    useEffect(() => {
        if (isEditBtn)
            Services.getVideoLiked({ userId: currentUser.id }).then((data) => {
                if (data) {
                    setLikedVideo(data);
                }
            });
    }, [currentUser, isEditBtn]);
    const handleGetVideoLiked = () => {
        setListVideo(likedVideo);
    };
    const handleGetVideoUser = () => {
        if (dataUser) {
            setIsLoading(false);
            setListVideo(dataUser.videos);
        }
    };
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
                    <div className={cx('loading')}>{!data ? <h1>User does not exist</h1> : <Loading />}</div>
                ) : (
                    <div className={cx('content')}>
                        <Userinfo data={dataUser} isEditBtn={isEditBtn} />
                        <div className={cx('wrap-videos')}>
                            <div className={cx('btn-toggle')}>
                                <span
                                    className={cx('btn-video', activeBtn && 'active-btn')}
                                    onClick={() => {
                                        handleGetVideoUser();
                                        setActiveBtn(false);
                                    }}
                                >
                                    Video
                                </span>
                                <span
                                    className={cx('btn-liked', !activeBtn && 'active-btn')}
                                    onClick={() => {
                                        handleGetVideoLiked();
                                        setActiveBtn(true);
                                    }}
                                >
                                    {!isEditBtn ? <LockIcon /> : <UserIcon />} Liked
                                </span>
                                <span className={cx('slider', activeBtn && 'active-slider')}></span>
                            </div>
                            {!activeBtn ? (
                                <VideosProfile data={listVideo} onClick={handleClickVideo} isEditBtn={isEditBtn} />
                            ) : (
                                <>
                                    {!isEditBtn ? (
                                        <div className={cx('private')}>
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
                                        </div>
                                    ) : (
                                        <VideosProfile
                                            data={listVideo}
                                            onClick={handleClickVideo}
                                            isEditBtn={!isEditBtn}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
