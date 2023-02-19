import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, FlagIcon, LogoIcon, PlayIcon, UpIcon } from '~/component/Icons';
import Image from '~/component/Image';
import Video from '~/component/Video';
import VolumeVideo from '~/component/Video/VolumeVideo';
import styles from './VideoDetail.module.scss';
const cx = classNames.bind(styles);

function VideoDetail({ data, index, dataList, handleNext, handlePrev, handleClose }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef();
    useEffect(() => {
        if (data) {
            videoRef.current.play();
        }
    }, [data]);
    useEffect(() => {
        isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlaying]);

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('img')} src={data.thumb_url} alt="avatar" />
            <div className={cx('content-video')} onClick={() => setIsPlaying(!isPlaying)}>
                <div className={cx('main-video')}>
                    <Video
                        classVideo={cx('video')}
                        src={data.file_url}
                        ref={videoRef}
                        loop
                        type={data.meta.file_format}
                        control={false}
                    />
                </div>
            </div>
            <div className={cx('volume-control')}>
                <VolumeVideo />
            </div>
            <span className={cx('icon', 'icon-logo')}>
                <LogoIcon width={'40px'} height={'40px'} />
            </span>
            <span className={cx('icon', 'icon-flag')}>
                <FlagIcon height={'14px'} width={'14px'} />
                <p> Báo cáo</p>
            </span>
            <span className={cx('icon', 'icon-close')} onClick={handleClose}>
                <CloseIcon height={'24px'} width={'24px'} />
            </span>
            {index > 0 && (
                <span
                    className={cx('icon', 'icon-up')}
                    onClick={() => {
                        setIsPlaying(true);
                        handlePrev();
                    }}
                >
                    <UpIcon />
                </span>
            )}

            {index < dataList.length - 1 && (
                <span
                    className={cx('icon', 'icon-down')}
                    onClick={() => {
                        setIsPlaying(true);
                        handleNext();
                    }}
                >
                    <UpIcon />
                </span>
            )}
            {!isPlaying && (
                <span className={cx('icon', 'icon-play')} onClick={() => setIsPlaying(!isPlaying)}>
                    <PlayIcon height={'80px'} width={'80px'} />
                </span>
            )}
        </div>
    );
}
VideoDetail.prototype = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dataList: PropTypes.array.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};
// data, index, dataList, handleNext, handlePrev, handleClose
export default VideoDetail;
