import Menu from '~/component/Popper/Menu';
import {
    CommentIcon,
    ShareIcon,
    DipIcon,
    TelegramRedIcon,
    FacebookIcon,
    WhatsAppIcon,
    LinksIcon,
    DownIcon,
    TwitterIcon,
    LinkedIcon,
    TelegramBlueIcon,
    EmailIcon,
    LineIcon,
    PinTeRestIcon,
    LikeIconFull,
} from '~/component/Icons';

import classNames from 'classnames/bind';
import styles from './IconVideo.module.scss';
import UserContext from '~/component/Contexts/UserContext';
import IconLikeVideo from './IconLikeVideo';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <DipIcon />,
        title: 'dip',
    },
    {
        icon: <TelegramRedIcon />,
        title: 'Send to friends',
        to: '/feedback',
    },
    {
        icon: <FacebookIcon />,
        title: 'Share with facebook',
    },

    {
        icon: <WhatsAppIcon />,
        title: 'Share with Whats APp',
    },
    {
        icon: <LinksIcon />,
        title: 'Share with Link',
    },

    {
        shareArrow: <DownIcon />,
        children: {
            data: [
                {
                    icon: <DipIcon />,
                    title: 'dip',
                },
                {
                    icon: <TelegramRedIcon />,
                    title: 'Send to friends',
                },
                {
                    icon: <FacebookIcon />,
                    title: 'Share with facebook',
                },

                {
                    icon: <WhatsAppIcon />,
                    title: 'Share with Whats APP',
                },
                {
                    icon: <LinksIcon />,
                    title: 'Share with Link',
                },
                {
                    icon: <TwitterIcon />,
                    title: 'Share with Twitter',
                },
                {
                    icon: <LinkedIcon />,
                    title: 'Share with LinkedIn',
                },
                {
                    icon: <TelegramBlueIcon />,
                    title: 'Share with Telegram',
                },

                {
                    icon: <EmailIcon />,
                    title: 'Share with Email',
                },
                {
                    icon: <LineIcon />,
                    title: 'Share with Line',
                },
                {
                    icon: <PinTeRestIcon />,
                    title: 'Share with PinTeRest',
                },
            ],
        },
    },
];

function IconVideo({ data, onOpenVideo }) {
    const { currentUser } = UserContext();
    const { setIsModalAuth } = useModalAuthContext();

    const handleOpenModal = () => {
        setIsModalAuth(true);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <IconLikeVideo data={data} isLogin={!currentUser ? false : true} openModal={handleOpenModal}>
                    <LikeIconFull width={'24px'} height={'24px'} />
                </IconLikeVideo>
                <div className={cx('btn-icons')} onClick={!currentUser ? handleOpenModal : onOpenVideo}>
                    <span className={cx('icons')}>
                        <CommentIcon width={'24px'} height={'24px'} />
                    </span>
                </div>
                <strong>{data.comments_count}</strong>
                <Menu items={MENU_ITEMS} delay={[0, 300]} offset={[100, 8]} placement="top" menuShare>
                    <div className={cx('btn-icons')}>
                        <span className={cx('icons')}>
                            <ShareIcon width={'24px'} height={'24px'} />
                        </span>
                    </div>
                </Menu>
                <strong>{data.shares_count}</strong>{' '}
            </div>
        </>
    );
}

export default IconVideo;
