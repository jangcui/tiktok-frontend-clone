import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/component/Icons';

import Button from '~/component/Button';
import SuggestAccounts from '~/component/SuggestAccounts';
import config from '~/config';
import * as Services from '~/Services/Services';
import DiscoverSidebar from './DiscoverSidebar';
import FooterSidebar from './FooterSidebar';
import Menu, { MenuItems } from './Menu';
import styles from './Sidebar.module.scss';
import UserContext from '~/component/Contexts/UserContext/UserContext';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';

const cx = classNames.bind(styles);

const RANDOM = () => Math.floor(Math.random() * 10 + 1);
function Sidebar({ small = false }) {
    const user = UserContext();
    const { setIsModalAuth } = useModalAuthContext();
    const [page, setPage] = useState(RANDOM);
    const [dataUser, setDataUser] = useState([]);
    const [dataFollow, setDataFollow] = useState([]);
    useEffect(() => {
        Services.getSuggested({ page: page, per_page: 15 }).then((data) => {
            data && setDataUser((preUser) => [...preUser, ...data]);
        });
    }, [page]);

    useEffect(() => {
        if (page > 15) {
            return setPage(1);
        }
    }, [page]);

    useEffect(() => {
        user &&
            Services.getFollowList(1).then((data) => {
                if (data) {
                    setDataFollow((preUser) => [...preUser, ...data]);
                }
            });
    }, [user]);

    return (
        <div className={cx('wrapper', small && 'small')}>
            <Menu>
                <MenuItems
                    title="For You"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItems
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItems title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                {!!!user && (
                    <div className={cx('btn-login')}>
                        <p className={cx('btn-title')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button large outline onClick={() => setIsModalAuth(true)}>
                            <b> Log in</b>
                        </Button>
                    </div>
                )}
                <SuggestAccounts label="Suggested accounts" data={dataUser} />

                {user && <SuggestAccounts label="Following accounts" data={dataFollow} />}
                <DiscoverSidebar />
                <FooterSidebar />
            </Menu>
        </div>
    );
}
Sidebar.prototype = {
    small: PropTypes.bool,
};
export default Sidebar;
