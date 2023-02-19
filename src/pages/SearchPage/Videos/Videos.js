import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { PlayIcon } from '~/component/Icons';
import Image from '~/component/Image';
import styles from './Videos.module.scss';
const cx = classNames.bind(styles);

function Videos() {
    return (
        <>
            <div className={cx('wrapper')}>
                <h1 className={cx('notification')}>Api not supported</h1>
                {/* <div className={cx('container')}>
                    <div className={cx('video-wrapper')}>
                        <video
                            className={cx('video')}
                            src="https://files.fullstack.edu.vn/f8-tiktok/videos/425-6339622720149.mp4"
                            alt="video user"
                        />
                        <span className={cx('time')}>2022-9-4</span>
                    </div>
                    <div className={cx('title')}>
                        <div className={cx('title-description')}>
                            hellu mọi ngừi hôm nay mềnh chơi game "sẽ"👁️👄👁️🤘🤘
                        </div>
                        <div className={cx('title-content')}>
                            <div className={cx('title-user')}>
                                <Image className={cx('user-avatar')} src={''} />
                                <p className={cx('user-name')}>Đăng nhập để fo</p>
                            </div>
                            <div className={cx('count')}>
                                <PlayIcon width={'14px'} height={'14px'} />
                                <span className={cx('count-number')}>2.8M</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <Outlet />
        </>
    );
}

export default Videos;
