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
import ConFirmContext from '~/component/Contexts/ConFirmContext';

const cx = classNames.bind(styles);

function CommentList({ data, onDeleteComment, setValueCmt, setIsEditComment, setIdComment }) {
    const { handleConfirm } = ConFirmContext();
    const [likeCount, setLikeCount] = useState(data.likes_count);
    const [isLike, setIsLike] = useState(data.is_liked);

    const [isUser, setIsUser] = useState(false);
    const { currentUser } = UserContext();

    const handleLikeComment = () => {
        setLikeCount(likeCount + 1);
        setIsLike(true);
        Services.likeComment(data.id).then(() => {
            console.log('like comment whose id is: ', data.id);
        });
    };
    useEffect(() => {
        if (currentUser) {
            if (currentUser.id === data.user.id) {
                setIsUser(true);
            } else {
                setIsUser(false);
            }
        }
    }, [currentUser, data]);

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
                <span onClick={() => window.location.reload()}>
                    <Link to={`/@${data.user.nickname}`}>
                        <Image src={data.user.avatar} className={cx('avatar')} />
                    </Link>
                </span>
            </SubInfoAvatar>
            <div className={cx('main-comment')}>
                <div className={cx('name-user')} onClick={() => window.location.reload()}>
                    <Link to={`/@${data.user.nickname}`}>
                        <span className={cx('name')}> {data.user.first_name + ' ' + data.user.last_name} </span>{' '}
                    </Link>
                    {isUser && <span className={cx('creator')}>.Creator</span>}
                </div>

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
                        {isUser ? (
                            // <b onClick={handleDeleteComment}>Delete</b>
                            <p
                                onClick={() =>
                                    handleConfirm({
                                        title: 'Delete comment ?',
                                        onConfirm: handleDeleteComment,
                                    })
                                }
                            >
                                <b>Delete</b>
                            </p>
                        ) : (
                            <p>
                                <FlagIcon /> <b>Report</b>
                            </p>
                        )}
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
