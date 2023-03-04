import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../Button';
import styles from './BtnToggleFollow.module.scss';
import * as Services from '~/Services/Services';
import UserContext from '../Contexts/UserContext/UserContext';
import useModalAuthContext from '../Contexts/useModalAuthContext';
import ConFirmContext from '../Contexts/ConFirmContext';
const cx = classNames.bind(styles);

function BtnToggleFollow({ dataUser, className }) {
    const user = UserContext();
    const { setIsModalAuth } = useModalAuthContext();
    const { handleConfirm } = ConFirmContext();

    const [isFollow, setIsFollow] = useState(dataUser.is_followed ? true : false);

    const classes = cx('wrapper', {
        [className]: className,
    });
    const handleFollow = () => {
        !user && setIsModalAuth(true);
        if (dataUser && !!user) {
            Services.followUser(dataUser.id)
                .then((data) => {
                    if (data) {
                        setIsFollow(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleUnFollow = () => {
        if (dataUser) {
            Services.unFollowUser(dataUser.id)
                .then((data) => {
                    if (data) {
                        setIsFollow(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className={classes}>
            {isFollow ? (
                <Tippy offset={[0, 15]} placement="left" content="Un follow" allowHTML=" false" delay={[500, 200]}>
                    <span
                        onClick={() =>
                            handleConfirm({
                                title: 'Un follow user ?',
                                status: 'Agree',
                                onDelete: handleUnFollow,
                            })
                        }
                    >
                        <Button text outline className={cx('btn-following')}>
                            <b> Following</b>
                        </Button>
                    </span>
                </Tippy>
            ) : (
                <span onClick={handleFollow}>
                    <Button outline className={cx('btn')}>
                        <b>Follow</b>
                    </Button>
                </span>
            )}
        </div>
    );
}

export default BtnToggleFollow;
