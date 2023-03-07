import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from './ModalWrapper.module.scss';
const cx = classNames.bind(styles);

function ModalWrapper({ children, isOpen, prior = false }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hidden');
        } else {
            document.body.classList.remove('hidden');
        }
    }, [isOpen]);

    return (
        <div className={cx('wrapper', isOpen && 'visible', prior && 'prior')}>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default ModalWrapper;
