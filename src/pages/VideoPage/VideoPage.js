import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Image from '~/component/Image';
import * as Services from '~/Services';

import Video from '~/component/Video';
import styles from './VideoPage.module.scss';
import CommentDetail from '~/component/ModalDetailVideo/CommentDetail';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import { PlayIcon, VideoIcon } from '~/component/Icons';
import VolumeVideo from '~/component/Video/VolumeVideo';
const cx = classNames.bind(styles);
function VideoPage() {
    const location = useLocation();
    const pathName = location.pathname;
    const [dataCmt, setDataCmt] = useState();
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef();
    useEffect(() => {
        if (dataCmt) {
            videoRef.current.play();
        }
    }, [dataCmt]);

    useEffect(() => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.play() : videoRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        let path = pathName.slice(pathName.lastIndexOf('/') + 1);
        Services.getAVideo(path).then((data) => {
            if (data) {
                setDataCmt(data);
                console.log(data);
            } else {
                console.log(123);
            }
        });
    }, [pathName]);
    return (
        <div className={cx('wrapper')}>
            <Header small />
            <Sidebar small />
            <div className={cx('container')}>
                {dataCmt ? (
                    <>
                        <div className={cx('wrap-video')}>
                            <Image className={cx('img')} src={dataCmt && dataCmt.thumb_url} />
                            {!isPlaying && (
                                <span className={cx('icon')} onClick={() => setIsPlaying(!isPlaying)}>
                                    <PlayIcon height={'80px'} width={'80px'} />
                                </span>
                            )}
                            <div className={cx('volume-control')}>
                                <VolumeVideo />
                            </div>
                            <div className={cx('content-video')} onClick={() => setIsPlaying(!isPlaying)}>
                                {dataCmt ? (
                                    <Video
                                        ref={videoRef}
                                        className={cx('video')}
                                        dataVideo={dataCmt.file_url}
                                        control={false}
                                    />
                                ) : null}
                            </div>
                        </div>

                        <div className={cx('wrap-comment')}> {dataCmt ? <CommentDetail data={dataCmt} /> : null}</div>
                    </>
                ) : (
                    <div className={cx('blank')}>
                        <div className={cx('blank-container')}>
                            <VideoIcon width={'90px'} height={'90px'} />
                            <h1>This video is unavailable</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPage;
