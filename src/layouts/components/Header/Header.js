import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faSignIn,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import images from '~/asset/images';
import Button from '~/component/Button';
import { MessageIcon, UploadIcon } from '~/component/Icons';
import Image from '~/component/Image';
import Search from '../Search';
import Menu from '~/component/Popper/Menu';
import config from '~/config';
import styles from './Header.module.scss';
import UserContext from '~/component/Contexts/UserContext/UserContext';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'keyboard shortcuts',
    },
];

function Header({ small }) {
    const { currentUser } = UserContext();
    const { setIsModalAuth } = useModalAuthContext();

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: currentUser && `/@${currentUser?.nickname}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            logout: '/logout',
            separate: true,
        },
    ];
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case '/language':
                // Handle change language
                console.log(123);
                break;
            default:
        }
        switch (menuItem.logout) {
            case '/logout':
                handleLogout();
                console.log(123);
                break;

            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', small && 'small')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <Image src={images.logo} alt="logo-tiktok" />
                    </Link>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <>
                        <Button
                            normal
                            className={cx('plus-upload')}
                            onClick={() => !currentUser && setIsModalAuth(true)}
                        >
                            <Link to={currentUser ? config.routes.upload : ''}>
                                <FontAwesomeIcon icon={faPlus} />
                                <b> Up Load</b>
                            </Link>
                        </Button>
                        {currentUser ? (
                            <>
                                <Tippy content="Message" placement="bottom" delay={[0, 200]}>
                                    <button className={cx('btn-actions')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Box" placement="bottom" delay={[0, 200]}>
                                    <button className={cx('btn-actions')}>
                                        {/* <span className={cx('notify')}></span> */}
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <Button primary onClick={() => setIsModalAuth(true)}>
                                <b>
                                    <FontAwesomeIcon icon={faSignIn} /> Log in
                                </b>
                            </Button>
                        )}
                    </>

                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        delay={[0, 700]}
                        offset={[12, 8]}
                        placement="bottom-end"
                    >
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
