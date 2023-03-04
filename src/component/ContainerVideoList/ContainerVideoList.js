import PropTypes from 'prop-types';

import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IconVideo from '~/pages/Home/IconVideo';
import SubInfoAvatar from '../../component/SubInfoUser';
import BtnToggleFollow from '../BtnToggleFollow';
import UserContext from '../Contexts/UserContext';
import { CheckIcon } from '../Icons';
import Image from '../Image';

import Video from '../Video';
import styles from './ContainerVideoList.module.scss';
import ModalDetailVideo from '../modals/ModalDetailVideo';

const cx = classNames.bind(styles);

function ContainerVideoList({ dataList }) {
    const user = UserContext();
    const [openVideo, setOpenVideo] = useState(false);
    const [dataVideo, setDataVideo] = useState({});
    const [index, setIndex] = useState(0);
    const videoRef = useRef();
    const myRef = useRef();

    useEffect(() => {
        if (openVideo) {
            videoRef.current.pause();
        }
    }, [openVideo]);

    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }, [index]);

    const handleClickVideo = (e, i) => {
        setOpenVideo(true);
        setIndex(i);
        setDataVideo(e);
    };
    return (
        <>
            <ModalDetailVideo
                dataList={dataList}
                dataVideo={dataVideo}
                isOpen={openVideo}
                setIndex={setIndex}
                index={index}
                onClose={() => setOpenVideo(false)}
            />
            {dataList?.map((data, i) => (
                <div className={cx('container')} key={i}>
                    <div className={cx('wrap-avatar')}>
                        <SubInfoAvatar delay={[800, 500]} data={data.user} offset={[-20, 0]} style>
                            <Link to={`/@${data.user.nickname}`}>
                                <Image className={cx('avatar')} src={data.user.avatar} alt="hehe" />
                            </Link>
                        </SubInfoAvatar>
                    </div>
                    <div className={cx('content')} ref={i === index ? myRef : null}>
                        <div className={cx('nickname')}>
                            <Link to={`/@${data.user.nickname}`}>
                                <h3>
                                    {data.user.nickname}
                                    {data.user.tick && <CheckIcon className={cx('check')} />}
                                </h3>
                                <h4>{data.user.first_name + ' ' + data.user.last_name}</h4>
                            </Link>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                {data.description}
                                <strong> {data.user.bio}</strong>
                            </span>
                        </div>
                        <div className={cx('name-song')}>
                            <a href=".">
                                <FontAwesomeIcon icon={faMusic} className={cx('sound')} />
                                <strong>{data.music}</strong>
                            </a>
                        </div>
                        <div className={cx('video-wrapper')}>
                            <div className={cx('wrap-video')}>
                                <Video
                                    dataVideo={data.file_url}
                                    typeVideo={data.meta.file_format}
                                    onClick={() => handleClickVideo(data, i)}
                                    classVideo={cx('video')}
                                    ref={videoRef}
                                    seekBar
                                />
                            </div>
                            <IconVideo data={data} onOpenVideo={() => handleClickVideo(data, i)} />
                        </div>
                    </div>
                    {user ? (
                        <>
                            {user && !data.user.is_followed && data.user.id !== user.id && (
                                <div className={cx('btn')}>
                                    <BtnToggleFollow dataUser={data} />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={cx('btn')}>
                            <BtnToggleFollow dataUser={data} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
ContainerVideoList.prototype = {
    dataList: PropTypes.array.isRequired,
};
export default ContainerVideoList;
