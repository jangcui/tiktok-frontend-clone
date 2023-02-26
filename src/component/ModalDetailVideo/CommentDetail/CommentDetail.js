import PropTypes from 'prop-types';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import BtnToggleFollow from '~/component/BtnToggleFollow';
import UserContext from '~/component/Contexts/UserContext';
import {
    ArrowIcon,
    CommentIcon,
    DipIcon,
    DotsIcon,
    FacebookIcon,
    LikeIconFull,
    LinksIcon,
    ShareIcon,
    TelegramRedIcon,
    WhatsAppIcon,
} from '~/component/Icons';
import Image from '~/component/Image';
import SubInfoAvatar from '~/component/SubInfoUser/SubInfoAvatar';
import IconLikeVideo from '~/pages/Home/IconVideo/IconLikeVideo';
import * as Services from '~/Services/Services';

import styles from './CommentDetail.module.scss';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';
import SkeletonLoader from '~/component/SkeletonLoader';
import CommentList from './CommentList';
import PostComment from './PostComment';
import NotifyContext from '~/component/Contexts/NotifyContext';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <DipIcon width={'22px'} height={'22px'} />,
        title: 'Embed',
    },
    {
        icon: <TelegramRedIcon width={'22px'} height={'22px'} />,
        title: 'Send to friends',
    },
    {
        icon: <FacebookIcon width={'22px'} height={'22px'} />,
        title: 'Share to Facebook',
    },
    {
        icon: <WhatsAppIcon width={'22px'} height={'22px'} />,
        title: 'Share to WhatsApp',
    },
    {
        icon: <LinksIcon width={'22px'} height={'22px'} />,
        title: 'Share to Twitter',
    },
];
function CommentDetail({ data }) {
    const user = UserContext();
    const { setAlert } = NotifyContext();

    const { setIsModalAuth } = useModalAuthContext();
    const [valueCmt, setValueCmt] = useState('');

    const [dataComment, setDataComment] = useState([]);
    const [idComment, setIdComment] = useState(null);
    const [indexCmt, setIndexCmt] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isEditComment, setIsEditComment] = useState(false);

    const handleDeleteComment = (index) => {
        let newData = [...dataComment];
        newData.splice(index, 1);
        setDataComment(newData);
        setAlert('Deleted', 1000);
    };

    const handleDeleteVideo = () => {
        Services.deleteVideo({ id: data.id }).then(() => {
            setAlert('Deleted video', 1000);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };
    const handleAddComment = (value) => {
        if (value) {
            setAlert('Comment posted', 1000);
            setDataComment((prev) => [...prev, value]);
        }
    };
    const handleEditComment = (dataPatch) => {
        let newData = [...dataComment];
        newData[indexCmt] = dataPatch;
        setDataComment(newData);
    };

    useEffect(() => {
        if (user && data) {
            setIsLoading(true);
            Services.getCommentsList(data.id).then((value) => {
                if (value) {
                    setIsLoading(false);
                    setDataComment(value.slice().reverse());
                }
            });
        }
    }, [data, user]);

    const handlePatchCmt = () => {
        Services.editComment({ id: idComment, comment: valueCmt }).then((data) => {
            setAlert('Comment edited', 1000);
            setIsEditComment(false);
            handleEditComment(data);
        });
    };
    const handlePostCmt = () => {
        Services.postCreateComment(data.id, valueCmt).then((value) => {
            setValueCmt('');
            handleAddComment(value);
        });
    };
    return (
        <div className={cx('wrap-comment')}>
            <div className={cx('user')}>
                <SubInfoAvatar
                    interactive
                    delay={[800, 500]}
                    offset={[6, 10]}
                    placement="bottom-start"
                    data={data.user}
                    style
                >
                    <Link to={`/@${data.user.nickname}`}>
                        <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                    </Link>
                </SubInfoAvatar>
                <div className={cx('info')}>
                    <span>{data.user.first_name + ' ' + data.user.last_name}</span>
                    <p>{data.user.nickname}</p>
                </div>
                {user && user.id === data.user.id ? (
                    <div className={cx('btn-delete')}>
                        <DotsIcon width={'34px'} height={'34px'} />
                        <div className={cx('dot-icon')}>
                            <span className={cx('pop-up')}>
                                <span className={cx('arrow')}>
                                    <ArrowIcon />
                                </span>
                                <p onClick={handleDeleteVideo}>Delete</p>
                            </span>
                        </div>
                    </div>
                ) : (
                    <span>
                        <BtnToggleFollow dataUser={data.user} />
                    </span>
                )}
            </div>

            <div className={cx('main-content')}>
                <div className={cx('des')}>{data.description}</div>
                <div className={cx('music')}>
                    <span>
                        <FontAwesomeIcon icon={faMusic} />
                    </span>
                    <h4>{data.music}</h4>
                </div>
                <div className={cx('action')}>
                    <div className={cx('btn-like')}>
                        <IconLikeVideo
                            className={cx('like-icon')}
                            data={data}
                            isLogin={!user ? false : true}
                            openModal={() => setIsModalAuth(true)}
                        >
                            <LikeIconFull width={'18px'} height={'18px'} />
                        </IconLikeVideo>
                        <span className={cx('comment-icon')}>
                            <CommentIcon width={'18px'} height={'18px'} />
                        </span>
                        <strong>{data.comments_count}</strong>
                    </div>
                    <div className={cx('btn-share')}>
                        {MENU_ITEMS.map((item, index) => (
                            <span title={item.title} key={index}>
                                {item.icon}
                            </span>
                        ))}
                        <span>
                            <ShareIcon width={'20px'} height={'20px'} />
                        </span>
                    </div>
                </div>
                <div className={cx('link')}>
                    <p>{` https://www.tiktok.com/@${data.user.nickname}/video/${data.uuid}`}</p>
                    <span>
                        <strong>Copy link</strong>
                    </span>
                </div>
            </div>
            <div className={cx('view-comment')}>
                {user ? (
                    <>
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : (
                            <>
                                {dataComment.map((data, index) => (
                                    <CommentList
                                        data={data}
                                        key={index}
                                        setValueCmt={setValueCmt}
                                        setIsEditComment={() => {
                                            setIndexCmt(index);
                                            setIsEditComment(true);
                                        }}
                                        setIdComment={setIdComment}
                                        onDeleteComment={() => {
                                            handleDeleteComment(index);
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <p className={cx('loading')}>Please Login to see comments</p>
                )}
            </div>
            <div className={cx('post-comment')}>
                <div className={cx('container')}>
                    {user ? (
                        <PostComment
                            onPostComment={handlePostCmt}
                            onPatchComment={handlePatchCmt}
                            valueCmt={valueCmt}
                            setValueCmt={setValueCmt}
                            isEditComment={isEditComment}
                            setIsEditComment={setIsEditComment}
                        />
                    ) : (
                        <span className={cx('btn-login')} onClick={() => setIsModalAuth(true)}>
                            <p>Please log in to comment</p>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
CommentDetail.prototype = {
    data: PropTypes.object.isRequired,
};
export default CommentDetail;
