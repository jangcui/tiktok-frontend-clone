import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VolumeVideo.module.scss';
import { MuteIcon, VolumeIcon } from '~/component/Icons';
import VolumeContext from '~/component/Contexts/VolumeContext';

const cx = classNames.bind(styles);

function VolumeVideo() {
    const { volume, setVolume } = VolumeContext();

    const [slider, setSlider] = useState(volume);
    const slideRef = useRef(null);

    useEffect(() => {
        setSlider(volume * 40);
    }, [volume]);
    useEffect(() => {
        slideRef.current.style.height = volume * 100 + '%';
    }, [volume]);

    const handleMuted = () => {
        const value = localStorage.getItem('VOLUME');
        if (+volume === 0 && +value === 0) {
            setVolume(0.5);
            localStorage.setItem('VOLUME', 0.5);
        } else {
            setVolume((prev) => (+prev === 0 ? value : 0));
        }
    };
    const handleValueVolumeChange = (e) => {
        const value = +e.target.value;
        setVolume(value);
        localStorage.setItem('VOLUME', value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('progress')}>
                <div className={cx('progress-bar')} ref={slideRef}>
                    <div className={cx('progress-circle')}></div>
                </div>
            </div>
            <div className={cx('icon')} onClick={handleMuted}>
                {+volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </div>{' '}
            <input
                defaultValue={volume}
                type="range"
                min={0}
                max={1}
                step={0.05}
                name=""
                className={cx('range')}
                onChange={handleValueVolumeChange}
            />
        </div>
    );
}

export default VolumeVideo;
