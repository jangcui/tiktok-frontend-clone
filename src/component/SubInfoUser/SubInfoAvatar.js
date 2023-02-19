import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Image from '~/component/Image';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import Tippy from '@tippyjs/react/headless';

import { Link } from 'react-router-dom';
import BtnToggleFollow from '../BtnToggleFollow';
import { CheckIcon } from '../Icons';
import styles from './SubInfoAvatar.module.scss';
const cx = classNames.bind(styles);

function SubInfoAvatar({ data, children, style = false, offset = [], delay = [] }) {
    const renderInfo = (props) => {
        return (
            <PopperWrapper>
                <div className={cx('wrapper')} {...props}>
                    <div className={cx('header')}>
                        <Link to={`/@${data.nickname}`}>
                            <Image className={cx('logo')} src={data.avatar} alt={data.first_name + data.last_name} />
                        </Link>
                        <div className={cx('btn')}>
                            <BtnToggleFollow dataUser={data} />
                        </div>
                    </div>
                    <Link to={`/@${data.nickname}`}>
                        <span className={cx('nickname')}>
                            {data.nickname} {data.tick && <CheckIcon className={cx('check')} />}
                        </span>
                    </Link>
                    <span>{data.first_name + ' ' + data.last_name}</span>
                    <div className={cx('follow')}>
                        <b>{data.followers_count}</b>
                        <span>Follower</span>
                        <b>{data.likes_count}</b>
                        <span>Likes</span>
                    </div>
                    {style && <p className={cx('user-card')}>{data.bio}</p>}
                </div>
            </PopperWrapper>
        );
    };

    return (
        <Tippy
            interactive={'true'}
            placement="bottom-start"
            delay={delay}
            offset={offset}
            zIndex={'9999'}
            render={renderInfo}
            popperOptions={{ strategy: 'fixed' }}
        >
            {children}
        </Tippy>
    );
}
SubInfoAvatar.prototype = {
    data: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    style: PropTypes.bool,
    offset: PropTypes.array,
    delay: PropTypes.array,
};
export default SubInfoAvatar;
