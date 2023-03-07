import classNames from 'classnames/bind';
import { UserIcon } from '~/component/Icons';
import Video from '~/component/Video';

import styles from './VideosProfile.module.scss';
const cx = classNames.bind(styles);
function VideosProfile({ data, onClick, isEditBtn }) {
    return (
        <>
            {data?.length > 0 ? (
                <div className={cx('wrapper')}>
                    {data.map((element, index) => (
                        <div className={cx('container')} key={index}>
                            <div className={cx('wrap-video')}>
                                <Video
                                    dataVideo={element.file_url}
                                    type={element.meta.file_format}
                                    muted
                                    classVideo={cx('video')}
                                    control={false}
                                    seekBar={false}
                                    onClick={() => onClick(element, index)}
                                    onMouseOver={(e) => e.target.play()}
                                    onMouseOut={(e) => e.target.pause()}
                                />
                            </div>
                            <div className={cx('title')}>
                                <p>{element.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('no-video')}>
                    <UserIcon className={cx('icon')} />
                    <h2>{!isEditBtn ? 'No content' : 'Upload your first video'}</h2>
                    <p>{!isEditBtn ? 'You are no liked video yet.' : 'Your videos will appear here'}</p>
                </div>
            )}
        </>
    );
}

export default VideosProfile;
