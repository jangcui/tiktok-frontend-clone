import { useState } from 'react';
import className from 'classnames/bind';

import Button from '~/component/Button';
import { DownIcon, WarningIcon } from '~/component/Icons';
import * as Services from '~/Services/Services';
import styles from './UploadPage.module.scss';
import FooterUploadPage from './FooterUploadPage';
import Uploader from './Uploader';
import FieldInput from './FieldInput/FieldInput';
import NotifyContext from '~/component/Contexts/NotifyContext';

const cx = className.bind(styles);

const valueViewAble = [
    { id: 0, value: 'Public' },
    { id: 1, value: 'Friends' },
    { id: 2, value: 'Private' },
];
function UploadPage() {
    const formData = new FormData();
    const { setAlert } = NotifyContext();
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [valueDes, setValueDes] = useState('');
    const [nameMusic, setNameMusic] = useState('');
    const [fileVideo, setFileVideo] = useState();
    const [allowUser, setAllowUser] = useState([
        { id: 1, isAllow: true, name: 'Comment' },
        { id: 2, isAllow: true, name: 'Duet' },
        { id: 3, isAllow: true, name: 'Stitch' },
    ]);

    const [viewAble, setViewAble] = useState({
        choses: 'Public',
        active: valueViewAble[0],
        content: valueViewAble,
    });

    const handleViewAble = (view, index) => {
        setViewAble({ ...viewAble, choses: view.value, active: viewAble.content[index] });
    };
    const handleActiveViewAble = (index) => {
        if (viewAble.content[index] === viewAble.active) {
            formData.append('viewable', viewAble.choses.toLowerCase());
            return 'is-selected';
        } else {
            return ' ';
        }
    };
    const handleNameMusic = (e) => {
        setNameMusic(e.target.value);
    };
    const handleDescription = (e) => {
        setValueDes(e.target.value);
    };
    const handleAllowUser = (e) => {
        e.isAllow = !e.isAllow;
        setAllowUser([...allowUser]);
    };
    const handleFormData = () => {
        formData.append('description', valueDes);
        formData.append('upload_file', fileVideo);
        formData.append('thumbnail_time', '3');
        formData.append('music', nameMusic);

        allowUser.forEach((allow) => {
            if (allow.isAllow) {
                return formData.append('allows[]', allow.name.toLowerCase());
            } else {
                return;
            }
        });
    };
    const handlePostVideo = () => {
        setIsLoading(true);
        handleFormData();
        Services.postVideo({ formData: formData }).then((data) => {
            console.log(data);
            if (data) {
                setNameMusic('');
                setValueDes('');
                setIsLoading(false);
                setFileVideo(null);
                setAlert('Upload video successful', 3000);
            } else {
                setIsLoading(false);
                setAlert('Upload failed, please try again ', 3000);
            }
        });
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('layout')}>
                    <div className={cx('container', 'animation')}>
                        {isLoading && (
                            <div className={cx('wrap-loading')}>
                                <div className={cx('loader')}>
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        )}
                        <div className={cx('title')}>
                            <h2>Upload video</h2>
                            <h4>Post a video to your account</h4>
                        </div>
                        <div className={cx('content')}>
                            <Uploader fileVideo={fileVideo} setFileVideo={setFileVideo} />
                            <div className={cx('form-upload')}>
                                <FieldInput
                                    title={'Description:'}
                                    value={valueDes}
                                    onChange={handleDescription}
                                    placeholder={'Write description or something else...'}
                                />
                                <FieldInput
                                    title={'The name of the song in the video is:'}
                                    value={nameMusic}
                                    onChange={handleNameMusic}
                                    placeholder={'The name of the song in the video...'}
                                />

                                <div className={cx('viewable')}>
                                    <h2>Who can watch this video:</h2>
                                    <div className={cx('drop-down')} onClick={() => setIsActive(!isActive)}>
                                        <span>{viewAble.choses}</span>
                                        <div className={cx('drop-option', isActive && 'active')}>
                                            {viewAble.content.map((view, index) => (
                                                <span
                                                    key={index}
                                                    onClick={() => handleViewAble(view, index)}
                                                    className={cx(handleActiveViewAble(index))}
                                                >
                                                    {view.value}
                                                </span>
                                            ))}
                                        </div>
                                        <DownIcon
                                            className={cx('down-icon', isActive && 'rotate')}
                                            width={'14px'}
                                            height={'14px'}
                                        />
                                    </div>
                                </div>
                                <div className={cx('select-wrapper')}>
                                    <h2> Allow users to:</h2>
                                    <div className={cx('selector')}>
                                        {allowUser.map((user) => (
                                            <label name={user.id} className={cx('selector-content')} key={user.id}>
                                                <input
                                                    type="checkbox"
                                                    name={user.id}
                                                    checked={user.isAllow}
                                                    onChange={() => handleAllowUser(user)}
                                                />
                                                <span>{user.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('switch')}>
                                    <div className={cx('switch-title')}>
                                        <h2>Run a copyright check</h2>
                                    </div>
                                    <div className={cx('copyright')}>
                                        <span>
                                            We'll check your video for potential copyright infringements on used sounds.
                                            If infringements are found, you can edit the video before posting.{' '}
                                            <b>Learn more</b>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('note')}></div>
                                <div className={cx('btn-post')}>
                                    <Button normal onClick={() => setFileVideo(null)}>
                                        Discard
                                    </Button>
                                    <Button
                                        disable={!valueDes || !nameMusic || !fileVideo}
                                        primary
                                        onClick={handlePostVideo}
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterUploadPage />
            </div>
        </>
    );
}

export default UploadPage;
