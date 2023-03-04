import classNames from 'classnames/bind';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/component/Button';
import UserContext from '~/component/Contexts/UserContext';
import { CloseIcon, EditAvatarIcon } from '~/component/Icons';
import Image from '~/component/Image';
import ModalWrapper from '../ModalWrapper';
import FiledInput from './FiledInput';
import styles from './ModalEdit.module.scss';

const cx = classNames.bind(styles);

function ModalEdit() {
    const user = UserContext();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [valueNickName, setValueNickName] = useState(user?.nickname);
    const [valueFistName, setValueFistName] = useState(user?.first_name);
    const [valueLastName, setValueLastName] = useState(user?.last_name);
    const [valueBioUser, setValueBioUser] = useState(user?.bio);

    console.log(location);
    console.log(user);
    console.log(valueBioUser.length);
    return (
        <>
            <ModalWrapper isOpen={isOpen}>
                <div className={cx('container')}>
                    <div className={cx('wrap-title')}>
                        <h1 className={cx('title')}>Edit profile</h1>
                        <span className={cx('icon-close')} onClick={() => setIsOpen(!isOpen)}>
                            <CloseIcon width={'24px'} height={'24px'} />
                        </span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('wrap-filed', 'border-bottom')}>
                            <h3 className={cx('filed-title')}> Profile photo</h3>
                            <span className={cx('avatar')}>
                                <Image src={user.avatar} className={cx('img')} />
                                <span className={cx('edit-icon')}>
                                    <EditAvatarIcon width={'20px'} height={'20px'} />
                                </span>
                            </span>
                        </div>

                        <FiledInput
                            title={'Nick Name'}
                            defaultValue={valueNickName}
                            option
                            onChange={setValueNickName}
                        />

                        <FiledInput title={'Fist Name'} defaultValue={valueFistName} onChange={setValueFistName} />

                        <FiledInput title={'Last Name'} defaultValue={valueLastName} onChange={setValueLastName} />

                        <div className={cx('wrap-filed')}>
                            <h3 className={cx('filed-title')}> Bio</h3>
                            <div className={cx('filed-input')}>
                                <textarea
                                    defaultValue={valueBioUser}
                                    onChange={(e) => setValueBioUser(e)}
                                    type="text"
                                    placeholder="Bio"
                                    className={cx('input', 'textarea')}
                                />
                                <p>{valueBioUser.length}/80</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrap-btn')}>
                        <>
                            <Button normal>Cancel</Button>
                        </>
                        <>
                            <Button primary>Save </Button>
                        </>
                    </div>
                </div>
            </ModalWrapper>
            <Button primary onClick={() => setIsOpen(!isOpen)}>
                click
            </Button>
        </>
    );
}

export default ModalEdit;
