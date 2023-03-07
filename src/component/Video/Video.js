import PropTypes from 'prop-types';

import { PlayIcon, PauseIcon } from '~/component/Icons';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import SeekBarVideo from './SeekBarVideo';
import VolumeVideo from './VolumeVideo';

import { useInView } from 'react-intersection-observer';
import VolumeContext from '../Contexts/VolumeContext';
import Loading from '../Loading';
const cx = classNames.bind(styles);

function Video(
    { dataVideo, control = true, seekBar = true, typeVideo, onClick, classVideo, classIcon, ...props },
    ref,
) {
    const { volume } = VolumeContext();
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTimeVideo, setCurrentVideo] = useState(0);
    const [durationVideo, setDurationVideo] = useState(0);
    const [percent, setPerCent] = useState(0);

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play();
        },
        pause() {
            videoRef.current.pause();
        },
    }));

    const [ViewRef, inView, entry] = useInView({
        threshold: 0.4,
        trackVisibility: true,
        delay: 400,
    });
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            setDurationVideo(videoRef.current.duration);
        }
    }, [volume]);
    useEffect(() => {
        if (inView && entry?.isVisible) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [inView, entry?.isVisible]);
    useEffect(() => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.play() : videoRef.current.pause();
        }
    }, [isPlaying]);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTimePlay = (e) => {
        setCurrentVideo(e.target.currentTime);
        setDurationVideo(e.target.duration);
        let percent = (currentTimeVideo / durationVideo) * 100;
        setPerCent(percent);
    };

    const handleSeekVideo = (e) => {
        let value = parseInt(e.target.value);
        let percent = (value * videoRef.current.duration) / 100;
        videoRef.current.currentTime = percent;
        setPerCent(e.target.value);
        setCurrentVideo(percent);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap-video')}>
                    {isLoading && (
                        <div className={cx('loading')}>
                            <Loading />
                        </div>
                    )}
                    {control && <div className={cx('view-video')} ref={ViewRef} />}
                    <video
                        className={classVideo}
                        tabIndex="2"
                        src={dataVideo}
                        type={typeVideo}
                        ref={videoRef}
                        loop
                        onClick={onClick}
                        onTimeUpdate={handleTimePlay}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadedData={() => setIsLoading(false)}
                        {...props}
                    />
                </div>

                <div className={cx('wrap-icon')}>
                    {control && (
                        <>
                            <div onClick={handlePlay} className={cx('play')}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </div>

                            <div className={cx('wrap-volume')}>
                                <VolumeVideo />
                            </div>
                        </>
                    )}

                    <div className={cx('seek-bar')}>
                        {seekBar && (
                            <SeekBarVideo
                                percent={percent}
                                onSeek={handleSeekVideo}
                                currentTime={currentTimeVideo}
                                durationTime={durationVideo}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
forwardRef(Video).propTypes = {
    dataVideo: PropTypes.string,
    inView: PropTypes.bool,
    iconVideo: PropTypes.bool,
    typeVideo: PropTypes.string,
    onClick: PropTypes.func,
    classVideo: PropTypes.string,
    classIcon: PropTypes.string,
    props: PropTypes.object,
    ref: PropTypes.object,
};

export default forwardRef(Video);
// export default Video;
