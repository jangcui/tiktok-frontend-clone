import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);

function Loading({ className }) {
    return (
        <div className={cx('app', className)}>
            <div className={cx('loader')} />
        </div>
    );
}

export default Loading;
