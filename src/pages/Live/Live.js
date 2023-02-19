import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Live.module.scss';
const cx = classNames.bind(styles);
function Live() {
    const [open, setOpen] = useState(false);
    return (
        <div className={cx('loading')}>
            <button
                onClick={() => {
                    console.log(123);
                    setOpen(!open);
                }}
            >
                heheeh
            </button>
        </div>
    );
}

export default Live;
