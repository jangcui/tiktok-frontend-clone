import classNames from 'classnames/bind';
import Button from '~/component/Button';
import ConFirmContext from '~/component/Contexts/ConFirmContext';
import ModalWrapper from '../ModalWrapper';
import styles from './ModalConfirm.module.scss';
const cx = classNames.bind(styles);

function ModalConfirm() {
    const { title, isConfirm, status = 'Delete', onConfirm, onClose } = ConFirmContext();
    return (
        <ModalWrapper prior isOpen={isConfirm}>
            <div className={cx('content')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('wrap-btn')}>
                    <>
                        <Button primary onClick={onConfirm}>
                            <b>{status}</b>
                        </Button>
                    </>
                    <>
                        <Button normal onClick={onClose}>
                            <b> Cancel</b>
                        </Button>
                    </>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default ModalConfirm;
