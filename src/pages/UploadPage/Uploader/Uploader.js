import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Button from '~/component/Button';
import Image from '~/component/Image';
import Video from '~/component/Video';

import styles from './Uploader.module.scss';
const cx = classNames.bind(styles);

function Uploader({ fileVideo, setFileVideo }) {
    const fileRef = useRef();
    const [convertFile, setConvertFile] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const previewFile = (e) => {
        setIsLoading(false);
        const fileVideo = e.target.files[0];
        const reader = new FileReader();
        if (fileVideo) {
            setFileVideo(fileVideo);
            reader.readAsDataURL(fileVideo);
        }
        reader.onloadend = (readerEvent) => {
            if (fileVideo.type.includes('video')) {
                setIsLoading(true);
                setConvertFile(readerEvent.target.result);
            }
        };
    };
    useEffect(() => {
        !fileVideo && setConvertFile(null);
    }, [fileVideo]);
    return (
        <>
            <div className={cx('container')}>
                <input ref={fileRef} type="file" hidden onInput={previewFile} />

                {convertFile ? (
                    <div className={cx('wrap-video')}>
                        {isLoading ? (
                            <Video src={convertFile} classVideo={cx('video-preview')} />
                        ) : (
                            <div className={cx('loading')}>
                                <div className={cx('loader')}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <p>Just a second...</p>
                            </div>
                        )}
                        <Button normal className={cx('btn-change')} onClick={() => fileRef.current.click()}>
                            Change Video
                        </Button>
                    </div>
                ) : (
                    <div className={cx('uploader')} onClick={() => fileRef.current.click()}>
                        <div className={cx('upload-card')}>
                            <Image
                                className={cx('img')}
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                alt="image"
                            />
                            <div className={cx('des-1')}>
                                <h2>Select video to upload</h2>
                            </div>
                            <div className={cx('des-2')}>
                                <span>MP4 or WebM</span>
                                <span>720x1280 resolution or higher</span>
                                <span>Up to 30 minutes</span>
                                <span>Less than 2 GB</span>
                            </div>
                            <Button primary className={cx('btn-upload')}>
                                Select file
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Uploader;
