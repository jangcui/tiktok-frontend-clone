import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './SkeletonLoader.module.scss';

const cx = classNames.bind(styles);

function SkeletonLoader({ amount = 10 }) {
    const [item, setItem] = useState([1]);
    useEffect(() => {
        for (let i = 0; i < amount; i++) {
            setItem((prev) => [...prev, i]);
        }
    }, [amount]);
    return (
        <>
            {item.map((e, index) => (
                <div className={cx('skeleton')} key={index}>
                    <span className={cx('skeleton-avatar', 'loading')}></span>
                    <div className={cx('skeleton-content')}>
                        <span className={cx('skeleton-name', 'loading')}></span>
                        <span className={cx('skeleton-title', 'loading')}></span>
                        <span className={cx('skeleton-sub', 'loading')}></span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SkeletonLoader;
