import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './FieldInput.module.scss';
const cx = className.bind(styles);

function FieldInput({ title, value, onChange, placeholder }) {
    const inputRef = useRef();
    const [isFieldEmpty, setIsFieldEmpty] = useState(false);
    useEffect(() => {
        if (!value) {
            setIsFieldEmpty(true);
        }
    }, [value]);
    return (
        <>
            <div className={cx('caption')}>
                <h2>{title}</h2>
                <div
                    className={cx('input')}
                    onClick={() => {
                        setIsFieldEmpty(false);
                        inputRef.current.focus();
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        onBlur={() => {
                            if (!value) {
                                setIsFieldEmpty(true);
                            }
                        }}
                    />
                </div>
                {isFieldEmpty ? (
                    <span className={cx('error')}>This field is required, cannot be left blank.</span>
                ) : null}
            </div>
        </>
    );
}

export default FieldInput;
