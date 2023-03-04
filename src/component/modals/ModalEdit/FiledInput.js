import classNames from 'classnames/bind';
import UserContext from '~/component/Contexts/UserContext';
import styles from './ModalEdit.module.scss';
const cx = classNames.bind(styles);

function FiledInput({ title, option = false, onChange, defaultValue }) {
    const user = UserContext();

    return (
        <div className={cx('wrap-filed', 'border-bottom')}>
            <h3 className={cx('filed-title')}>{title}</h3>
            <div className={cx('filed-input')}>
                <input
                    defaultValue={defaultValue}
                    onChange={onChange}
                    type="text"
                    placeholder={title}
                    className={cx('input')}
                />
                {option && (
                    <>
                        <p>www.tiktok.com/@{user.nickname}</p>
                        <p>Your nickname can only be changed once every 7 days.</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default FiledInput;
