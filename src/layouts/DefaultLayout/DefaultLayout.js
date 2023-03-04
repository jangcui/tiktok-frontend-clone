import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import { ScrollIcon } from '~/component/Icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const btnRef = useRef();
    useEffect(() => {
        window.scrollTo(0, 50);
    }, []);
    useEffect(() => {
        if (btnRef.current) {
            const onScroll = () => {
                window.pageYOffset <= 50
                    ? (btnRef.current.style.bottom = '-50px')
                    : (btnRef.current.style.bottom = '10px');
            };
            window.removeEventListener('scroll', onScroll);
            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        } else {
            return;
        }
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: 20,
            left: 20,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('wrap-btn')} ref={btnRef} onClick={handleScroll} delay={[500, 200]}>
                <Tippy placement="top" content="Scroll top" allowHTML=" false">
                    <button primary className={cx('scroll-btn')}>
                        <ScrollIcon />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
