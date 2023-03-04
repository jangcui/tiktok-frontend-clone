import classNames from 'classnames/bind';
import { useState } from 'react';
import ConFirmContext from '~/component/Contexts/ConFirmContext';
import ModalEdit from '~/component/modals/ModalEdit';
import styles from './Live.module.scss';
const cx = classNames.bind(styles);
function Live() {
    return (
        <div className={cx('loading')}>
            <ModalEdit />
        </div>
    );
}

export default Live;
