import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ArrowIcon, DotsIcon, FlagIcon, LikeIcon, LikeIconActive } from '~/component/Icons';
import Image from '~/component/Image';
import SubInfoAvatar from '~/component/SubInfoUser/SubInfoAvatar';
import styles from './CommentList.module.scss';
import * as Services from '~/Services/Services';
import UserContext from '~/component/Contexts/UserContext';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function CommentList({ data, onDeleteComment, setValueCmt, setIsEditComment, setIdComment }) {
    const [likeCount, setLikeCount] = useState(data.likes_count);
    const [isLike, setIsLike] = useState(data.is_liked);

    const [isUser, setIsUser] = useState(false);
    const user = UserContext();

    const handleLikeComment = () => {
        setLikeCount(likeCount + 1);
        setIsLike(true);
        Services.likeComment(data.id).then(() => {
            console.log('like comment whose id is: ', data.id);
        });
    };

    useEffect(() => {
        if (user) {
            if (user.id === data.user.id) {
                setIsUser(true);
            } else {
                setIsUser(false);
            }
        }
    }, [user, data]);

    const handleUnLikeComment = () => {
        setLikeCount(likeCount - 1);
        setIsLike(false);
        Services.unLikeComment(data.id).then(() => {
            console.log('unlike comment whose id is: ', data.id);
        });
    };

    const handleDeleteComment = () => {
        Services.deleteComment(data.id).then(() => {
            onDeleteComment();
        });
    };

    const handleEditComment = () => {
        setIsEditComment();
        setValueCmt(data.comment);
        setIdComment(data.id);
    };
    return (
        <div className={cx('wrapper')}>
            <SubInfoAvatar
                interactive
                delay={[800, 500]}
                offset={[6, 10]}
                placement="bottom-start"
                data={data.user}
                style
            >
                <Link to={`/@${data.user.nickname}`}>
                    <Image src={data.user.avatar} className={cx('avatar')} />
                </Link>
            </SubInfoAvatar>
            <div className={cx('main-comment')}>
                <Link to={`/@${data.user.nickname}`}>
                    <span className={cx('name-user')}>{data.user.first_name + ' ' + data.user.last_name} </span>
                </Link>
                <p className={cx('comment-text')}>{data.comment}</p>
                <span className={cx('sub-comment')}>
                    {data.updated_at}
                    {isUser ? <b onClick={handleEditComment}>Edit</b> : null}
                </span>
            </div>
            <div className={cx('like-comment')}>
                <div className={cx('dot-icon')}>
                    <DotsIcon width={'24px'} height={'24px'} />
                    <span className={cx('pop-up')}>
                        <span className={cx('arrow')}>
                            <ArrowIcon />
                        </span>
                        <p>
                            {isUser ? (
                                <b onClick={handleDeleteComment}>Delete</b>
                            ) : (
                                <>
                                    <FlagIcon /> <b>Report</b>
                                </>
                            )}
                        </p>
                    </span>
                </div>
                <span className={cx('btn-like')}>
                    <span onClick={!isLike ? handleLikeComment : handleUnLikeComment}>
                        {isLike ? (
                            <LikeIconActive className={cx('active')} width={'20px'} height={'20px'} />
                        ) : (
                            <LikeIcon width={'20px'} height={'20px'} />
                        )}
                    </span>
                    <span className={cx('count')}>{likeCount}</span>
                </span>
            </div>
        </div>
    );
}
CommentList.prototype = {
    data: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    setValueCmt: PropTypes.func.isRequired,
    setIsEditComment: PropTypes.func.isRequired,
    setIdComment: PropTypes.func.isRequired,
};
export default CommentList;
