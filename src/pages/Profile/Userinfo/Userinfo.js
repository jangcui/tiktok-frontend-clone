import classNames from 'classnames/bind';
import BtnToggleFollow from '~/component/BtnToggleFollow';
import Button from '~/component/Button';
import { CheckIcon, DotsIcon, EditIcon, ShareIcon } from '~/component/Icons';
import Image from '~/component/Image';
import styles from './Userinfo.module.scss';
const cx = classNames.bind(styles);

function Userinfo({ dataUser, isEditBtn }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Image className={cx('avatar')} src={dataUser.avatar} alt="avatar" />
                <div className={cx('user')}>
                    <h2 className={cx('nickname')}>
                        {dataUser.nickname} {dataUser.tick && <CheckIcon className={cx('check')} />}
                    </h2>
                    <h4 className={cx('name')}>{dataUser.first_name + ' ' + dataUser.last_name}</h4>

                    <div className={cx('btn')}>
                        {isEditBtn ? (
                            <Button text normal>
                                <EditIcon /> <b>Edit Profile</b>
                            </Button>
                        ) : (
                            <BtnToggleFollow dataUser={dataUser} />
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('count')}>
                <b>{dataUser.followings_count}</b>
                <span> Following</span>
                <b>{dataUser.followers_count}</b>
                <span>Follower</span>
                <b>{dataUser.likes_count}</b>
                <span>Like</span>
            </div>
            <div className={cx('bio')}>
                <p>{dataUser.bio === '' ? 'No bio yet' : dataUser.bio}</p>
            </div>
        </div>
    );
}

export default Userinfo;
