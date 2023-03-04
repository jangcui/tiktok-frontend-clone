import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';
import { useEffect, useState } from 'react';
import * as Services from '~/Services/Services';

const cx = classNames.bind(styles);

function IconLikeVideo({ data, isLogin, openModal, children, className }) {
    const [likeCount, setLikeCount] = useState(data.likes_count);
    const [isLike, setIsIsLike] = useState(data.is_liked);

    const postLikeVideo = () => {
        if (isLogin) {
            setIsIsLike(true);
            setLikeCount(likeCount + 1);
            Services.likeAPost({ id: data.id }).then(() => {
                console.log('like a post');
            });
        } else {
            openModal();
        }
    };
    useEffect(() => {
        setIsIsLike(data.is_liked);
        setLikeCount(data.likes_count);
    }, [data]);
    const postUnLikeVideo = () => {
        setIsIsLike(false);
        setLikeCount(likeCount - 1);
        Services.unLikeAPost({ id: data.id }).then(() => {
            console.log('unlike a post');
        });
    };
    const toggleLike = () => {
        !isLike ? postLikeVideo() : postUnLikeVideo();
    };
    return (
        <>
            <div className={cx('btn-icons', className)} onClick={toggleLike}>
                <span className={cx('icons', isLike ? 'active' : '')}>{children}</span>
            </div>
            <strong>{likeCount}</strong>
        </>
    );
}
IconLikeVideo.prototype = {
    data: PropTypes.object,
    isLogin: PropTypes.bool,
    openModal: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};
// data, isLogin, openModal, children, className
export default IconLikeVideo;
