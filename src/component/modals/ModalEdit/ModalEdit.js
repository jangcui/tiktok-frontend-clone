import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/component/Button';
import ConFirmContext from '~/component/Contexts/ConFirmContext';
import NotifyContext from '~/component/Contexts/NotifyContext';
import UserContext from '~/component/Contexts/UserContext';
import { CloseIcon, EditAvatarIcon, TickIcon } from '~/component/Icons';
import Image from '~/component/Image';
import { useDebounce } from '~/hook';
import * as Services from '~/Services/Services';
import ModalWrapper from '../ModalWrapper';
import styles from './ModalEdit.module.scss';

const cx = classNames.bind(styles);

function ModalEdit({ isOpen, setIsOpen }) {
    const fileRef = useRef();
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = UserContext();
    const { setAlert } = NotifyContext();
    const { handleConfirm } = ConFirmContext();

    const [fileImage, setFiImage] = useState();
    const [convertImage, setConvertImage] = useState();

    const [valueNickName, setValueNickName] = useState('');
    const [errorNickName, setErrorNickName] = useState({
        isErr: false,
        message: '',
    });
    const [loading, seLoading] = useState(false);
    const debouncedNickName = useDebounce(valueNickName, 1000);

    const [valueFistName, setValueFistName] = useState('');
    const [valueLastName, setValueLastName] = useState('');

    const [valueBioUser, setValueBioUser] = useState('');
    const [errBioUser, setErrBioUser] = useState(false);

    const [isConfirm, setIsConfirm] = useState(false);

    useEffect(() => {
        setConvertImage(currentUser?.avatar);
        setValueNickName(currentUser?.nickname);
        setValueFistName(currentUser?.first_name);
        setValueLastName(currentUser?.last_name);
        setValueBioUser(currentUser?.bio);
    }, [currentUser]);

    //handle avatar//
    useEffect(() => {
        return () => {
            convertImage && URL.revokeObjectURL(convertImage);
        };
    }, [convertImage]);

    const handlePreviewFile = async (e) => {
        const file = await e.target.files[0];
        if (file) {
            const img = await URL.createObjectURL(file);
            setFiImage(file);
            setConvertImage(img);
        }
    };
    //////handle filed nick name
    const handleValueNickName = (e) => {
        const value = e.target.value;
        setValueNickName(value);
    };
    useEffect(() => {
        if (debouncedNickName.trim().length <= 2) {
            setErrorNickName((prev) => {
                prev.isErr = true;
                prev.message = 'Include at least 2 characters in your username';
                return { ...prev };
            });
        } else {
            setErrorNickName((prev) => {
                prev.isErr = false;
                return { ...prev };
            });
        }
    }, [debouncedNickName]);
    useEffect(() => {
        if (debouncedNickName === currentUser.nickname) {
            return;
        }
        if (debouncedNickName.trim().length > 2) {
            seLoading(true);
            Services.search({ page: 1, type: 'less', q: debouncedNickName }).then((data) => {
                seLoading(false);
                if (data.length > 0) {
                    data.forEach((user) => {
                        if (user.nickname === debouncedNickName) {
                            setErrorNickName((prev) => {
                                prev.isErr = true;
                                prev.message = 'This username isn’t available. Please enter a new one.';
                                return { ...prev };
                            });
                        }
                    });
                } else {
                    seLoading(false);
                    setErrorNickName((prev) => {
                        prev.isErr = false;
                        return { ...prev };
                    });
                }
            });
        }
    }, [debouncedNickName, currentUser]);

    //////handle filed fist name
    const handleValueFistName = (e) => {
        const value = e.target.value;
        setValueFistName(value);
    };

    //////handle filed last name
    const handleValueLastName = (e) => {
        const value = e.target.value;
        setValueLastName(value);
    };

    //////handle filed bio

    const handleValueBioUser = (e) => {
        const value = e.target.value;
        setValueBioUser(value);
    };
    useEffect(() => {
        if (valueBioUser.length <= 80) {
            setErrBioUser(false);
        } else {
            setErrBioUser(true);
        }
    }, [valueBioUser]);
    //// handle submit
    useEffect(() => {
        if (currentUser) {
            if (
                valueNickName === currentUser.nickname &&
                valueFistName === currentUser.first_name &&
                valueLastName === currentUser.last_name &&
                valueBioUser === currentUser.bio
            ) {
                setIsConfirm(false);
            } else if (errorNickName.isErr && errBioUser) {
                setIsConfirm(false);
            } else {
                setIsConfirm(true);
            }
        }
    }, [currentUser, valueNickName, valueFistName, valueLastName, valueBioUser, errBioUser, errorNickName]);

    const createFromData = () => {
        const formData = new FormData();
        fileImage && formData.append('avatar', fileImage);
        if (valueNickName !== currentUser.nickname) {
            formData.append('nickname', valueNickName);
        }
        if (valueLastName !== currentUser.last_name) {
            formData.append('last_name', valueLastName);
        }
        if (valueFistName !== currentUser.first_name) {
            formData.append('first_name', valueFistName);
        }
        if (valueBioUser !== currentUser.bio) {
            formData.append('bio', valueBioUser);
        }
        return formData;
    };

    const handleSubmit = async () => {
        const result = await Services.updateCurrentUser({ formData: createFromData() });
        if (result) {
            localStorage.setItem('USER_LOGIN', JSON.stringify(result));
            setAlert('Information saved', 3000);
            setIsOpen(false);
            setCurrentUser(result);
            navigate(`/@${result.nickname}`);
        } else {
            setAlert('Some thing wrong, please try again...', 2000);
            setIsConfirm(false);
        }
    };
    return (
        <>
            <ModalWrapper isOpen={isOpen}>
                <div className={cx('container')}>
                    <div className={cx('wrap-title')}>
                        <h1 className={cx('title')}>Edit profile</h1>
                        <span className={cx('icon-close')} onClick={() => setIsOpen(false)}>
                            <CloseIcon width={'24px'} height={'24px'} />
                        </span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('wrap-filed', 'border-bottom')}>
                            <h3 className={cx('filed-title')}> Profile photo</h3>
                            <span className={cx('avatar')} onClick={() => fileRef.current.click()}>
                                <Image src={convertImage && convertImage} className={cx('img')} alt="avatar" />
                                <span className={cx('edit-icon')}>
                                    <EditAvatarIcon width={'20px'} height={'20px'} />
                                </span>
                                <input ref={fileRef} type="file" onInput={handlePreviewFile} hidden />
                            </span>
                        </div>
                        <div className={cx('wrap-filed', 'border-bottom')}>
                            <h3 className={cx('filed-title')}>Nick Name</h3>
                            <div className={cx('filed-input')}>
                                <input
                                    value={valueNickName}
                                    onChange={handleValueNickName}
                                    type="text"
                                    placeholder="Nick Name"
                                    className={cx('input', errorNickName.isErr && 'error')}
                                />
                                {!loading && !errorNickName.isErr && debouncedNickName !== currentUser.nickname && (
                                    <span className={cx('checking')}>
                                        <TickIcon className={cx('tick-icon')} />
                                    </span>
                                )}
                                {loading && (
                                    <span className={cx('checking')}>
                                        <div className={cx('loader')} />{' '}
                                    </span>
                                )}
                                {errorNickName.isErr && (
                                    <span className={cx('err-message')}>{errorNickName.message}</span>
                                )}
                                <p>www.tiktok.com/@{valueNickName}</p>
                                <p>Your nickname can only be changed once every 7 days.</p>
                            </div>
                        </div>
                        <div className={cx('wrap-filed', 'border-bottom')}>
                            <h3 className={cx('filed-title')}>Fist Name</h3>
                            <div className={cx('filed-input')}>
                                <input
                                    value={valueFistName}
                                    onChange={handleValueFistName}
                                    type="text"
                                    placeholder="Fist Name"
                                    className={cx('input')}
                                />
                            </div>
                        </div>
                        <div className={cx('wrap-filed', 'border-bottom')}>
                            <h3 className={cx('filed-title')}>Last Name</h3>
                            <div className={cx('filed-input')}>
                                <input
                                    value={valueLastName}
                                    onChange={handleValueLastName}
                                    type="text"
                                    placeholder="Last Name"
                                    className={cx('input')}
                                />
                            </div>
                        </div>

                        <div className={cx('wrap-filed')}>
                            <h3 className={cx('filed-title')}> Bio</h3>
                            <div className={cx('filed-input')}>
                                <textarea
                                    defaultValue={valueBioUser}
                                    onChange={handleValueBioUser}
                                    type="text"
                                    placeholder="Bio"
                                    className={cx('input', 'textarea', errBioUser && 'error')}
                                />
                                <p>
                                    <span className={cx(errBioUser && 'error-bio')}>{valueBioUser.length}</span>/80
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrap-btn')}>
                        <Button normal onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            primary
                            disable={!isConfirm}
                            onClick={() =>
                                handleConfirm({
                                    title: 'This form will be changed ?',
                                    status: 'Confirm',
                                    onConfirm: handleSubmit,
                                })
                            }
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
}
ModalEdit.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default ModalEdit;
