import className from 'classnames/bind';
import styles from './PopUpNotify.module.scss';
import NotifyContext from '../Contexts/NotifyContext';
const cx = className.bind(styles);

function PopUpNotify() {
    const { title, isAlert } = NotifyContext();

    return (
        <div className={cx('wrapper', isAlert && 'slide')}>
            <div className={cx('container')}>
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default PopUpNotify;
