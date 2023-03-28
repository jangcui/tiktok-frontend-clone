import { useEffect, useState } from 'react';
import styles from './ModalAuth.module.scss';
import classNames from 'classnames/bind';

import {
    CloseIcon,
    BackIcon,
    UserIcon,
    FacebookIcon,
    KaKaoTalkIcon,
    InstagramIcon,
    GoogleIcon,
    TwitterIcon,
    AppleIcon,
    QRIcon,
    LineIcon,
} from '~/component/Icons';
import Button from '~/component/Button';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';
import ModalWrapper from '../ModalWrapper';
import FormSignUp from './AccountRegister/FormSignUp';
import { FormLogin } from './AccountRegister';

const cx = classNames.bind(styles);

const MENU_SIGN_UP = [
    {
        type: 'qrCode',
        icon: <QRIcon />,
        title: 'Use QR code',
        possible: false,
    },
    {
        type: 'account',
        icon: <UserIcon />,
        title: 'Use phone or email',
        possible: true,
    },
    {
        type: 'facebook',
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        possible: false,
    },
    {
        type: 'google',
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        possible: false,
    },
    {
        type: 'twitter',
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        possible: false,
    },
    {
        type: 'twitter',
        icon: <LineIcon />,
        title: 'Continue with LINE',
        possible: false,
    },
    {
        type: 'kaKaoTalk',
        icon: <KaKaoTalkIcon />,
        title: 'Continue with KakaoTalk',
        possible: false,
    },
    {
        type: 'apple',
        icon: <AppleIcon />,
        title: 'Continue with Apple',
        possible: false,
    },
    {
        type: 'instagram',
        icon: <InstagramIcon />,
        title: 'Continue with Instagram',
        possible: false,
    },
];

const MENU_SIGN_IN = [
    {
        type: 'account',
        icon: <UserIcon />,
        title: 'Use phone or email',
        possible: true,
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        possible: false,
    },
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        possible: false,
        more: <BackIcon />,
        data: [
            {
                icon: <UserIcon />,
                title: 'Use phone or email',
                possible: true,
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
                possible: false,
            },
            {
                icon: <FacebookIcon />,
                title: 'Continue with Facebook',
                possible: false,
            },
            {
                icon: <TwitterIcon />,
                title: 'Continue with Twitter',
                possible: false,
            },
            {
                icon: <LineIcon />,
                title: 'Continue with LINE',
                possible: false,
            },
        ],
    },
];

function ModalAuth() {
    const { isModalAuth, setIsModalAuth } = useModalAuthContext();

    const [items, setItems] = useState(MENU_SIGN_UP);
    const [isMenuItems, setIsMenuItems] = useState(false);

    useEffect(() => {
        isMenuItems ? setItems(MENU_SIGN_IN) : setItems(MENU_SIGN_UP);
    }, [isMenuItems]);

    const handleItems = (item) => {
        switch (item.type) {
            case 'account':
                setItems('');
                break;
            default:
        }
    };
    const handleNav = () => {
        setIsMenuItems(!isMenuItems);
    };
    const handleBack = () => {
        isMenuItems ? setItems(MENU_SIGN_IN) : setItems(MENU_SIGN_UP);
    };

    return (
        <>
            <ModalWrapper isOpen={isModalAuth}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        {!isMenuItems ? <h1> Log in to TikTok</h1> : <h1> Sign up for TikTok</h1>}
                        <span className={cx('icon-close')} onClick={() => setIsModalAuth(false)}>
                            <CloseIcon width={'28px'} height={'28px'} />
                        </span>
                        {items.length === 0 && (
                            <span className={cx('icon-back')} onClick={handleBack}>
                                <BackIcon />
                            </span>
                        )}
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('body')}>
                            {items.length === 0 && isMenuItems && <FormSignUp />}
                            {items.length === 0 && !isMenuItems && <FormLogin />}
                            {items &&
                                items.map((item, index) => (
                                    <div key={index} className={cx('wrap-action')} onClick={() => handleItems(item)}>
                                        <Button normal disable={!item.possible}>
                                            <span className={cx('icon')}>{item.icon}</span>
                                            <p>{item.title}</p>
                                        </Button>
                                        {item.more && (
                                            <span className={cx('show-more')} onClick={() => setItems(item.data)}>
                                                {item.more}
                                            </span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    {isMenuItems && (
                        <div className={cx('policy-confirm')}>
                            <p>
                                By continuing, you agree to TikTok’s <i>Terms of Service</i> and confirm that you have
                                read TikTok’s <i>Privacy Policy.</i>
                            </p>
                        </div>
                    )}

                    <div className={cx('footer')}>
                        {!isMenuItems ? <p>Don’t have an account?</p> : <p>Already have an account?</p>}
                        <span className={cx('nav')} onClick={handleNav}>
                            {!isMenuItems ? 'Sign up' : 'Log in'}
                        </span>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
}

export default ModalAuth;
